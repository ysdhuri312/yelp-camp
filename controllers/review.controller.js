/** @format */

import catchAsyncError from '../utils/catchAsyncError.js';
import Review from '../models/review.model.js';
import Campground from '../models/campground.model.js';

const createReview = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  console.log(review);
  //   console.log(campground);
  await campground.review.push(review);
  await Review.create({ ...req.body.review });
  await campground.save();
  res.redirect(`/campground/${campground._id}`);
});

export { createReview };
