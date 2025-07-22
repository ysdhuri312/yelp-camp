/** @format */

import mongoose, { Schema } from 'mongoose';
import Review from './review.model.js';

const campgroundSchema = new Schema({
  title: String,
  image: String,
  description: String,
  location: String,
  price: Number,
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
