const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database Connected".bgCyan);
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });

    await camp.save();
  }
};

seedDB();
