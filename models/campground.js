/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review')

const CampgroundSchema = new Schema({
  title: String,
  description: String,
  location: String,
  img_url: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

module.exports = mongoose.model("Campground", CampgroundSchema);
