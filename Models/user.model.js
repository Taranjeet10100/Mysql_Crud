const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone_no: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    enum:["male", "female", "other"],
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User;