/** @format */

import express from 'express';
import methodOverride from 'method-override';
import engine from 'ejs-mate';
import session from 'express-session';
import flash from 'connect-flash';

import path from 'node:path';

import connectDB from './config/db.js';
import errorHandler from './utils/error.handler.js';
import CustomError from './utils/CustomError.js';

import campgroundRoutes from './routes/campground.routes.js';
import reviewRoutes from './routes/review.routes.js';
import userRoutes from './routes/user.routes.js';

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
var sessionConfig = {
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Middleware for flash messages
app.use((req, res, next) => {
  res.locals.isAuthenticated = false;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Home Route
app.get('/', (req, res, next) => {
  res.render('home');
});

// Routes
app.use('/user', userRoutes);
app.use('/campground', campgroundRoutes);
app.use('/campground', reviewRoutes);

// System automated urls
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) =>
  res.status(204).end()
);

// 404 error route
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  return new CustomError(404, 'Page not found...');
});

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log('✅ Server running on http://localhost:3000');
});
