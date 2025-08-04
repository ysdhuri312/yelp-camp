/** @format */

import mongoose, { Schema } from 'mongoose';
import Review from './review.model.js';
import User from './user.model.js';

const campgroundSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  description: String,
  location: String,
  price: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

campgroundSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Campground = mongoose.model('Campground', campgroundSchema);

export default Campground;
