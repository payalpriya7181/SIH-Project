const mongoose = require("mongoose")

const detail = mongoose.Schema({
    name: String,
    email: String,
    contact: Number
})

module.exports = mongoose.model("detail", detail)