import Location from "../models/Location.js";
import Hotels from "../models/Hotel.js";
import Rooms from "../models/Rooms.js";
import { Op } from "sequelize";
import Booking from "../models/Booking.js";
import sequelize from "../config/db.js"; // Ensure you import your sequelize instance
import { refundPayment } from "./PaymentController.js";
import Payment from "../models/Payment.js";

const HotelLocationController = async (req, res) => {
  try {
    const allLocations = await Location.findAll();
    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error);
  }
};
const HotelSearchController = async (req, res) => {
  const {
    location,
    adults_number,
    checkin_date,
    checkout_date,
    children_ages,
    price_min,
    price_max,
  } = req.body;

  try {
    const hotels = await Hotels.findAll({
      where: { regionId: location },
      attributes: [
        "address",
        "available",
        "hotelImage",
        "hotel_id",
        "minRoomsLeft",
        "name",
        "price_per_night",
        "regionId",
        "review_score",
        "review_score",
        "review_total",
      ],
    });
    const updatedHotels = hotels.map((hotel) => ({
      ...hotel.toJSON(),
      checkin_date,
      checkout_date,
      adults_number,
      children_ages,
    }));
    return res.status(201).json(updatedHotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching hotels." });
  }
};
const HotelRoomSearch = async (req, res) => {
  const {
    checkin_date,
    checkout_date,
    children_ages,
    adults_number,
    hotel_id,
  } = req.body;
  const totalChildren = Number(children_ages);
  const totalAdults = Number(adults_number);
  const totalMember = totalChildren + totalAdults;

  try {
    const rooms = await Rooms.findAll({
      where: {
        hotel_id: hotel_id,
        available_from: {
          [Op.lte]: new Date(checkin_date),
        },
        available_to: {
          [Op.gte]: new Date(checkout_date),
        },
        capacity: {
          [Op.gte]: totalMember,
        },
      },
    });
    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
  }
};
const BookingDetails = (req, res) => {
  const userid = req.user.user.user_id;
  Booking.findAll({
    where: { user_id: userid },
    attributes: ["total_price", "checkin_date", "checkout_date"],
    include: [
      {
        model: Hotels,
        attributes: ["name", "hotelImage", "hotel_id"],
      },
      {
        model: Rooms,
        attributes: ["unitId"],
      },
    ],
  })
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      console.error("Error fetching booking details:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};
const CancelBooking = async (req, res) => {
  const { hotelId, roomId } = req.body;
  const t = await sequelize.transaction();
  try {
    const booking = await Booking.findOne({
      where: {
        hotel_id: hotelId,
        unitId: roomId,
        user_id: req.user.user.user_id,
        checkin_date: { [Op.gte]: new Date() },
      },
      transaction: t,
    });
    if (!booking) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "Room is no longer available for cancellation." });
    }

    await Booking.destroy(
      {
        where: {
          hotel_id: hotelId,
          unitId: roomId,
          user_id: req.user.user.user_id,
        },
      },
      { transaction: t }
    );

    const saleId = booking.sale_id;
    const refund = await refundPayment(req, saleId);

    if (!refund || refund.state !== "completed") {
      await t.rollback();
      return res.status(500).json({ error: "Refund process failed" });
    }

    const paymentDataForDB = {
      user_id: req.user.user.user_id,
      sale_id: refund.sale_id,
      pay_id: refund.parent_payment,
      payment_mode: "refund",
      payment_status: refund.state,
      payment_amount: refund.amount.total,
      payment_time: new Date().toISOString(),
    };
    console.log(paymentDataForDB);

    await Payment.create(paymentDataForDB, { transaction: t });
    await t.commit();

    res.status(200).json({
      message:
        "Booking cancelled successfully and refund will initiate shortly",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  HotelLocationController,
  HotelSearchController,
  BookingDetails,
  HotelRoomSearch,
  CancelBooking,
};
