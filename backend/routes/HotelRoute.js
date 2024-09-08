import express from "express";
import {
  BookingDetails,
  CancelBooking,
  HotelLocationController,
  HotelRoomSearch,
  HotelSearchController,
} from "../controllers/HotelController.js"; // Add .js extension for ES module imports
import {
  CreatePayment,
  paymentDetails,
  refundPayment,
  Success,
} from "../controllers/PaymentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"; // Use ES module import syntax

const app = express.Router();

app.post("/hotellocation", AuthMiddleware, HotelLocationController);
app.get("/hotellocation", AuthMiddleware, HotelLocationController);
app.post("/hotelsearch", AuthMiddleware, HotelSearchController);
app.post("/roomsearch", AuthMiddleware, HotelRoomSearch);
app.get("/getbooking", AuthMiddleware, BookingDetails);
app.post("/booking/cancel", AuthMiddleware, CancelBooking);
app.post("/pay/payment", AuthMiddleware, CreatePayment);
app.post("/pay/success", AuthMiddleware, Success);
app.post("/pay/getdetails", paymentDetails);
app.post("/pay/refund", refundPayment);

export default app;
