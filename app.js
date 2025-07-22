/** @format */

import express from 'express';
import methodOverride from 'method-override';
import engine from 'ejs-mate';

import path from 'node:path';

import connectDB from './config/db.js';
import errorHandler from './utils/error.handler.js';
import CustomError from './utils/CustomError.js';

import campgroundRoutes from './routes/campground.routes.js';
import reviewRoutes from './routes/review.routes.js';

const app = express();
const PORT = 3000;

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
connectDB();

// Middlewares
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
  res.render('home');
});

// Routes
app.use('/campground', campgroundRoutes);
app.use('/campground', reviewRoutes);

app.use((req, res, next) => {
  // console.log(`${req.method} ${req.path}`)
  next(new CustomError(404, 'Page not found...', undefined));
});

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log('✅ Server running on http://localhost:3000');
});
