/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  description: String,
  location: String,
  img_url: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
