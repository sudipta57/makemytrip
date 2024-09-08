// FlightRoute.js
import express from "express";
import FlightLocationController from "../controllers/FlightController.js";

const app = express.Router();

app.post("/flightlocation", FlightLocationController);

export default app;
