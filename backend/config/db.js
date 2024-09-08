// config.js
import { Sequelize } from "sequelize";
const sequelize = new Sequelize("booking-app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
