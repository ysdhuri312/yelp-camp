/** @format */

const express = require("express");
const colors = require("colors");
const path = require("path");
var methodOverride = require("method-override");
const morgan = require("morgan");
const engine = require("ejs-mate");

const mongoose = require("mongoose");
const Campgrounds = require("./models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database Connected".bgCyan);
});

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("home");
});

// show list of all campgrounds
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campgrounds.find({});
  res.render("campgrounds/index", { campgrounds });
});

// GET form for inserting campgorund
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// Insert new Campgrounds
app.post("/campgrounds", async (req, res) => {
  const campground = await new Campgrounds(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

// Show Campgorund
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campgrounds.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

// Edit form Campgorund
app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campgrounds.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

// Edit Campgorund
app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

// Delete Campgorund
app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campgrounds.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.use((req, res, next) => {
  res.render("campgrounds/notFound");
  next();
});

app.listen(3000, () => {
  console.log("Serving on Port 3000".bgMagenta);
});
