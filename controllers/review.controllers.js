/** @format */

import catchAsyncError from '../utils/catchAsyncError.js';
import Review from '../models/review.model.js';
import Campground from '../models/campground.model.js';
import customError from '../utils/CustomError.js';

const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, body } = req.body.review;

  if (!rating || !body) {
    throw new customError(400, 'All fields are required.');
  }

  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Review created successfully');
  res.redirect(`/campground/${campground._id}`);
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted successfully');
  res.redirect(`/campground/${id}`);
});
export { createReview, deleteReview };
