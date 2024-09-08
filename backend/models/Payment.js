import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define(
  "Payment",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pay_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
export default Payment;
