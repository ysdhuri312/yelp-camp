/** @format */

import Campground from '../models/campground.model.js';
import catchAsyncError from '../utils/catchAsyncError.js';
import jwt from 'jsonwebtoken';
// import { cloudinary } from '../cloudinary/index.js';

const getAllCampgrounds = catchAsyncError(async (req, res, next) => {
  const campgrounds = await Campground.find({});
  if (req.session.userId) {
    res.locals.isAuthenticated = true;
  }
  res.render('campground/index', { campgrounds });
});

const showNewCampgroundForm = catchAsyncError((req, res, next) => {
  res.render('campground/new');
});

const createNewCampground = catchAsyncError(async (req, res, next) => {
  const { title, location, description, price } = req.body.campground;
  req.body.campground.images = req.files.map((f) => ({
    url: `http://localhost:3000/${f.path.replace(/\\/g, '/')}`,
    filename: f.filename,
  }));

  req.body.campground.author = req.userId;
  // console.log(req.files);
  if (!title || !location || !description || !price) {
    return new CustomError(400, 'All fields are required.');
  }
  const campground = await Campground.create({ ...req.body.campground });
  req.flash('success', 'Campground created successfully');
  res.redirect(`/campground/${campground._id}`);
});

const getCampground = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id)
    .populate('author')
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    });

  if (!campground) {
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campground/all');
  }

  if (req.session.userId) {
    res.locals.isAuthenticated = true;
  } else {
    res.locals.isAuthenticated = false;
  }

  res.render('campground/show', { campground });
});

const editCampgroundForm = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById({ _id: req.params.id });
  var decoded = await jwt.verify(req.session.userId, process.env.JWT_SECRET);

  if (campground.author._id == decoded.id) {
    res.render('campground/edit', { campground });
  } else {
    req.flash('error', 'You are not authorise to edit this campground');
    res.redirect('/campground/all');
  }
});

const editCampground = catchAsyncError(async (req, res, next) => {
  req.body.campground.images = req.files.map((f) => ({
    url: `http://localhost:3000/${f.path.replace(/\\/g, '/')}`,
    filename: f.filename,
  }));
  await Campground.findByIdAndUpdate(req.params.id, {
    $set: { ...req.body.campground },
  });
  const campgrounds = await Campground.find({});
  req.flash('success', 'Campground updated successfully');
  res.redirect('/campground/all');
});

const deleteCampground = catchAsyncError(async (req, res, next) => {
  const campground = await Campground.findById({ _id: req.params.id });
  var decoded = await jwt.verify(req.session.userId, process.env.JWT_SECRET);

  if (campground.author._id == decoded.id) {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Campground deleted successfully');
    res.redirect('/campground/all');
  } else {
    req.flash('error', 'You are not authorise to delete this campground');
    res.redirect('/campground/all');
  }
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
