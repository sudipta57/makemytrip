import { DataTypes } from "sequelize"; // Use ES module import syntax
import sequelize from "../config/db.js"; // Add .js extension for ES module imports
import Hotel from "./Hotel.js"; // Change to ES module import
import Rooms from "./Rooms.js"; // Change to ES module import
import User from "./User.js"; // Change to ES module import

const Booking = sequelize.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sale_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    adults_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    children_ages: {
      type: DataTypes.STRING,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Associations
Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Hotel, { foreignKey: "hotel_id" });
Booking.belongsTo(Rooms, { foreignKey: "unitId" });
// Booking.belongsTo(Payment, { foreignKey: "sale_id" });

export default Booking; // Use export default
