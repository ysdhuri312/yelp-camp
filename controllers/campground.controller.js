/** @format */

import Campground from '../models/campground.model.js';

const getAllCampgrounds = async (req, res, next) => {
  try {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds });
  } catch (e) {
    next(e);
  }
};

const showNewCampgroundForm = (req, res, next) => {
  try {
    res.render('campground/new');
  } catch (e) {
    next(e);
  }
};

const createNewCampground = async (req, res, next) => {
  try {
    const { title, location, description, price, image } = req.body.campground;

    if (!title || !location || !description || !price || !image) {
      throw new customError(
        400,
        'All fields are required.',
        'NewCamgroundRoute'
      );
    }

    const campground = await Campground.create({ ...req.body.campground });
    res.redirect(`/campground/${campground._id}`);
  } catch (e) {
    next(e);
  }
};

const getCampground = async (req, res, next) => {
  try {
    const campground = await Campground.findById({ _id: req.params.id });
    res.render('campground/show', { campground });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const editCampgroundForm = async (req, res, next) => {
  try {
    const campground = await Campground.findById({ _id: req.params.id });
    res.render('campground/edit', { campground });
  } catch (e) {
    next(e);
  }
};

const editCampground = async (req, res, next) => {
  try {
    await Campground.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body.campground },
    });
    const campgrounds = await Campground.find({});
    res.redirect('/campgrounds');
  } catch (e) {
    next(e);
  }
};

const deleteCampground = async (req, res, next) => {
  try {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campground/all');
  } catch (e) {
    next();
  }
};

export {
  getAllCampgrounds,
  showNewCampgroundForm,
  createNewCampground,
  getCampground,
  editCampgroundForm,
  editCampground,
  deleteCampground,
};
