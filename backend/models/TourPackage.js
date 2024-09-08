import sequelize from "../config/db.js";

const TourPackage = sequelize.define("TourPackage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imgSrc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewStars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  people: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bookingLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ageRestriction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dressCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serviceIncluded: {
    type: DataTypes.JSON, // Storing array as JSON
    allowNull: false,
  },
  serviceNotIncluded: {
    type: DataTypes.JSON, // Storing array as JSON
    allowNull: false,
  },
  returnTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TourPackage;
