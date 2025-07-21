/** @format */

import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
