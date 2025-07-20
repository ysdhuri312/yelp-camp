/** @format */

import express from 'express';
import methodOverride from 'method-override';
import engine from 'ejs-mate';

import path from 'node:path';

import connectDB from './config/db.js';

import customError from './utils/customError.js';
import errorHandler from './utils/error.handler.js';

import campgroundRoutes from './routes/campground.routes.js';

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

// Routes
app.get('/', (req, res, next) => {
  try {
    console.log('');
    res.render('home');
  } catch (e) {
    next();
  }
});

app.use('/campground', campgroundRoutes);

// app.get('/campground/all', getAllCampgrounds);

// app.get('/campground/new', showNewCampgroundForm);
// app.post('/campground', createNewCampground);

// app.get('/campground/:id', getCampground);

// app.get('/campground/:id/edit', editCampgroundForm);
// app.put('/campground/:id', editCampground);

// app.delete('/campground/:id', deleteCampground);

app.use((req, res, next) => {
  // console.log(`${req.method} ${req.path}`)
  return new customError(404, 'Page not found');
});

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log('✅ Server running on http://localhost:3000');
});
