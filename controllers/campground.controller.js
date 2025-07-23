/** @format */

import Campground from '../models/campground.model.js';
import catchAsyncError from '../utils/catchAsyncError.js';

const getAllCampgrounds = catchAsyncError(async (req, res, next) => {
  const campgrounds = await Campground.find({});
  res.render('campground/index', { campgrounds });
});

const showNewCampgroundForm = catchAsyncError((req, res, next) => {
  res.render('campground/new');
});

const createNewCampground = catchAsyncError(async (req, res, next) => {
  const { title, location, description, price, image } = req.body.campground;

  if (!title || !location || !description || !price || !image) {
    throw new customError(400, 'All fields are required.', 'NewCamgroundRoute');
  }
  const campground = await Campground.create({ ...req.body.campground });
  req.flash('success', 'Campground created successfully');
  res.redirect(`/campground/${campground._id}`);
});

const getCampground = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id).populate(
    'reviews'
  );
  res.render('campground/show', { campground });
});

const editCampgroundForm = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById({ _id: req.params.id });
  res.render('campground/edit', { campground });
});

const editCampground = catchAsyncError(async (req, res, next) => {
  await Campground.findByIdAndUpdate(req.params.id, {
    $set: { ...req.body.campground },
  });
  const campgrounds = await Campground.find({});
  res.redirect('/campground/all');
});

const deleteCampground = catchAsyncError(async (req, res, next) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.redirect('/campground/all');
});

export {
  getAllCampgrounds,
  showNewCampgroundForm,
  createNewCampground,
  getCampground,
  editCampgroundForm,
  editCampground,
  deleteCampground,
};
