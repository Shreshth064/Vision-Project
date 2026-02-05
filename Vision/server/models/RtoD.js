const mongoose = require('mongoose')

// Define the DataSchema
const DataSchema = new mongoose.Schema({
    Counter: String,
    To: String,
    Month: String,
    R1Sales: String,
    From: String,
  });
// Create the DataModel
const DataModel = mongoose.model("data", DataSchema);

module.exports = DataModel;
