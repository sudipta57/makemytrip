import sequelize from "./config/db.js";
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Booking from "./models/Booking.js";
import Location from "./models/Location.js";
import Rooms from "./models/Rooms.js";
import Payment from "./models/Payment.js";
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // This will alter the tables to match the models
    console.log("Database & tables synchronized!");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
