import paypal from "paypal-rest-sdk";
import axios from "axios";
import qs from "qs";
import Payment from "../models/Payment.js";
import Rooms from "../models/Rooms.js";
import sequelize from "../config/db.js";
import { Op } from "sequelize";
import Booking from "../models/Booking.js";
import cron from "node-cron";

// Replace these with your actual client ID and secret from PayPal
const clientId =
  process.env.PAYPAL_CLIENT_ID ||
  "AdtuWW36p-9uPhHm0QJUhRdxLJI-DA1TZGw2jLcsWmNBlq4oWcrhqQfqn6TkvJ9U6hfINXrMTaBr-BUP";
const clientSecret =
  process.env.PAYPAL_CLIENT_SECRET ||
  "EJx0qJWnh1ydEshgo2Pb2kLPiWrqlMwUU7N4JYan3URzsGKJOT3mYOF03eMYU5W9GGXMIsuw-d5dgCWn";

// cron job

// Schedule the cron job to run every minute
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    // Find rooms where the reservation has expired
    const roomsToRelease = await Rooms.findAll({
      where: {
        reservation_expiry: {
          [Op.lt]: now, // Find reservations that have expired
        },
        reserved_by: {
          [Op.not]: null, // Only rooms that are currently reserved
        },
      },
    });

    // Release the rooms by setting reserved_by and reservation_expiry to null
    await Promise.all(
      roomsToRelease.map(async (room) => {
        await room.update({
          reserved_by: null,
          reservation_expiry: null,
        });
      })
    );

    console.log(
      `${roomsToRelease.length} rooms released due to expired reservations`
    );
  } catch (error) {
    console.error("Error releasing rooms:", error);
  }
});

// PayPal configuration
paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id: clientId,
  client_secret: clientSecret,
});

async function getAccessToken() {
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${token}`,
  };

  const data = qs.stringify({ grant_type: "client_credentials" });

  try {
    const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      data,
      { headers }
    );
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(
      "Error getting access token:",
      JSON.stringify(error.response.data, null, 2)
    );
    throw new Error("Failed to retrieve PayPal access token");
  }
}

const CreatePayment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      price,
      checkin_date,
      checkout_date,
      children_ages,
      adults_number,
      hotel_id,
      room_id,
    } = req.body;

    // Validate user data
    if (!req.user || !req.user.user) {
      console.error("User data is missing");
      return res.status(401).json({ error: "User data is missing" });
    }
    // Check if the room is available
    const room = await Rooms.findOne(
      {
        where: {
          unitId: room_id,
          hotel_id: hotel_id,
          available_from: { [Op.lte]: checkin_date },
          available_to: { [Op.gte]: checkout_date },
          [Op.or]: [
            { reservation_expiry: null },
            { reservation_expiry: { [Op.lt]: new Date() } },
          ],
        },
      },
      { transaction }
    );

    if (!room) {
      await transaction.rollback();
      return res
        .status(409)
        .json({ error: "Room is no longer available or reserved" });
    }

    // Temporarily reserve the room
    await room.update(
      {
        reserved_by: req.user.user.user_id,
        reservation_expiry: new Date(Date.now() + 2 * 60 * 1000), // Reserve for 2 minutes
      },
      { transaction }
    );

    // Proceed with payment creation
    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `http://localhost:5173/payment-success?price=${price}&checkin=${checkin_date}&checkout=${checkout_date}&children_ages=${children_ages}&adults_number=${adults_number}&hotel_id=${hotel_id}&room_id=${room_id}`,
        cancel_url: "http://localhost:5173/payment-failed",
      },
      transactions: [
        {
          item_list: {
            items: [{ name, price: price, currency: "USD", quantity: 1 }],
          },
          amount: { currency: "USD", total: price },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error(
          "Error creating payment:",
          JSON.stringify(error, null, 2)
        );
        await transaction.rollback();
        return res.status(500).json({ error: "Payment creation failed" });
      } else {
        await transaction.commit();
        return res.status(200).json({ payment });
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in payment creation:", error);
    return res.status(500).json({ error: "Payment process failed" });
  }
};

const Success = async (req, res) => {
  let transaction;
  try {
    const {
      payerId,
      paymentId,
      price,
      checkin_date,
      checkout_date,
      children_ages,
      adults_number,
      hotel_id,
      room_id,
    } = req.body;

    // Validate user data
    if (!req.user || !req.user.user) {
      console.error("User data is missing");
      return res.status(401).json({ error: "User data is missing" });
    }

    transaction = await sequelize.transaction();

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [{ amount: { currency: "USD", total: price } }],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          console.error(
            "Payment execution error:",
            JSON.stringify(error, null, 2)
          );
          await transaction.rollback();
          return res.redirect("http://localhost:5173/payment-failed");
        } else {
          const transactions = payment.transactions[0];
          const pay_id = transactions.related_resources[0].sale.parent_payment;

          // Check if the payment already exists
          const existingPayment = await Payment.findOne({
            where: { pay_id },
            transaction,
          });
          if (existingPayment) {
            await transaction.rollback();
            return res
              .status(409)
              .json({ error: "Payment already processed." });
          }

          // Insert payment data into the Payment table
          const paymentDataForDB = {
            user_id: req.user.user.user_id,
            sale_id: transactions.related_resources[0].sale.id,
            pay_id,
            payment_mode: transactions.related_resources[0].sale.payment_mode,
            payment_status: transactions.related_resources[0].sale.state,
            payment_amount: transactions.related_resources[0].sale.amount.total,
            payment_time: transactions.related_resources[0].sale.create_time,
          };
          await Payment.create(paymentDataForDB, { transaction });

          // Update the room availability
          await Rooms.update(
            {
              reservation_expiry: null,
              reserved_by: null,
              available_from: checkout_date, // Set the next available date after checkout
            },
            { where: { unitId: room_id, hotel_id }, transaction }
          );

          // Insert booking data into the Booking table
          await Booking.create(
            {
              checkin_date,
              checkout_date,
              children_ages,
              adults_number,
              hotel_id,
              unitId: room_id,
              user_id: req.user.user.user_id,
              total_price: price,
              sale_id: transactions.related_resources[0].sale.id,
            },
            { transaction }
          );

          // Commit the transaction after all operations succeed
          await transaction.commit();
          return res.status(200).json({ success: true, transactions });
        }
      }
    );
  } catch (error) {
    // Rollback the transaction in case of error
    if (transaction) await transaction.rollback();
    console.error("Error in payment success process:", error);
    return res.status(500).json({ error: "Payment success process failed" });
  }
};

const paymentDetails = async (req, res) => {
  try {
    const { saleId } = req.body;
    const access_token = await getAccessToken();
    const saleDetailsUrl = `https://api.sandbox.paypal.com/v1/payments/sale/${saleId}`;

    const response = await axios.get(saleDetailsUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve payment details" });
  }
};

const refundPayment = async (req, saleId) => {
  try {
    const { total } = req.body;
    const refundUrl = `https://api.sandbox.paypal.com/v1/payments/sale/${saleId}/refund`;
    const access_token = await getAccessToken();

    const response = await axios.post(
      refundUrl,
      {
        amount: {
          total,
          currency: "USD",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    } else {
      console.error("Refund failed:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error processing refund:", error);
    return null;
  }
};

export { CreatePayment, Success, paymentDetails, refundPayment };
