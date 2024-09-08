// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import FlightRoute from "./routes/FlightRoute.js";
import HotelRoute from "./routes/HotelRoute.js";
import UserRoute from "./routes/UserRoute.js";
import testConnection from "./config/ConnDb.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

testConnection();

// Route to handle flight bookings
app.use("/api", FlightRoute);
app.use("/api", HotelRoute);
app.use("/api/user", UserRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
