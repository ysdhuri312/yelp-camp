const express = require("express");
const router = express.Router();

const catchAsync = require("../helpers/catchAsync");
const ErrorHandler = require("../helpers/ErrorHandler");
const { campgroundSchema } = require("../helpers/schemas");

const Campgrounds = require("../models/campground");


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);

    if (error) {
        const message = error.message;
        throw new ErrorHandler(message, 404);
    } else {
        next();
    }
}


router.get("/", (req, res) => {
    res.render("home");
});

// show list of all campgrounds
router.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campgrounds.find({});
    res.render("campgrounds/index", { campgrounds });
});

// GET form for inserting campgorund
router.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// Insert new Campgrounds METHOD- POST, './campgrounds'
router.post("/campgrounds", validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campgrounds(req.body.campground);

    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

// Show Campgorund
router.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campgrounds.findById(req.params.id);
    res.render("campgrounds/show", { campground });
});

// Edit form Campgorund
router.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campgrounds.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
});

// Edit Campgorund
router.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campgrounds.findByIdAndUpdate(id, {
        ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
}));

// Delete Campgorund
router.delete("/campgrounds/:id", async (req, res, next) => {

    try {
        const { id } = req.params;
        await Campgrounds.findByIdAndDelete(id);
        res.redirect("/campgrounds");

    } catch (e) {
        next(e);
    }
});

module.exports = router;