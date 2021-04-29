const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
