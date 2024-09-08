import { DataTypes } from "sequelize"; // Use ES module import syntax
import sequelize from "../config/db.js"; // Add .js extension for ES module imports

const Hotel = sequelize.define(
  "Hotel",
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Set hotel_id as the primary key
      autoIncrement: false, // Ensure it is not auto-increment
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    minRoomsLeft: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotelImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    review_score: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    review_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Hotel;
