import { DataTypes } from "sequelize"; // Use ES module import syntax
import sequelize from "../config/db.js"; // Add .js extension for ES module imports

const Location = sequelize.define(
  "Location",
  {
    gaiaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Location; // Use export default
