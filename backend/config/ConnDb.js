import sequelize from "../config/db.js";
async function testConnection() {
  try {
    if (!sequelize.connectionManager.getConnection()) {
      await sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfully."
      );
    } else {
      console.log("Database is already connected.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default testConnection;
