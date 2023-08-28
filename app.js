/** @format */

const express = require("express");
const colors = require("colors");
const path = require("path");
const crudOperations = require("./routes/crud");
const connectDB = require("./config/db");

var methodOverride = require("method-override");
const morgan = require("morgan");
const engine = require("ejs-mate");

connectDB(); // Database connection

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));


app.use(crudOperations); //Router Middleware

// Error Handling Middleware
app.all('*', (err, req, res, next) => {
  next(new ErrorHandler('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went Wrong...'
  res.status(statusCode).render('campgrounds/notFound', { err })
});



app.listen(3000, () => {
  console.log("Serving on Port 3000".bgMagenta.white);
});
