const mongoose = require("mongoose")

const { Schema } = mongoose

const usserModel = new Schema(
  {
    firstName: {type: String },
    lastName: {type: String },
    usserName: {type: String },
    password: {type: String },
    email: {type: String},
    address: {type: String},
    phone: {type: String}
  },
  {
    collection: 'Ussers'
  }
)

module.exports = mongoose.model("Usser", usserModel)