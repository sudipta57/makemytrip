import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Hotel from "./Hotel.js";

const Rooms = sequelize.define("Rooms", {
  unitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photoDescription: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  gallery: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  highlightedMessages: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  soldOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Hotel,
      key: "hotel_id",
    },
    allowNull: false,
  },
  available_from: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: "2024-08-08",
  },
  available_to: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: "2024-08-18",
  },
  // New fields for reservation management
  reservation_expiry: {
    type: DataTypes.DATE, // Use DATE to store both date and time
    allowNull: true, // Null means no reservation is active
  },
  reserved_by: {
    type: DataTypes.INTEGER, // This will store the user_id of the reserving user
    allowNull: true,
  },
});

// Associations
Rooms.belongsTo(Hotel, { foreignKey: "hotel_id" });

export default Rooms;
