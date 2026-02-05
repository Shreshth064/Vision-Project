const mongoose = require('mongoose')

// Define the DataSchema
const ForecastSchema = new mongoose.Schema({
    Counter: String,
    To: String,
    Month: String,
    Forecast: String,
    From: String,
  });
// Create the DataModel
const ForecastModel = mongoose.model("forcast", ForecastSchema);

module.exports = ForecastModel;