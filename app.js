import express from 'express';
import methodOverride from 'method-override';
import engine from 'ejs-mate';

import path from 'node:path';

import connectDB from './config/db.js';
import Campground from './models/campground.model.js';

import customError from './utils/customError.js';
import errorHandler from './utils/errorHandler.js'


const app = express();
const PORT = 3000;

app.engine('ejs', engine);
app.set("view engine", 'ejs');
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

app.get('/campgrounds', async (req, res, next) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campground/index', { campgrounds });
    } catch (e) {
        next();
    }
})

app.get('/campground/new', (req, res, next) => {
    try {
        res.render('campground/new');
    } catch (e) {
        next();
    }
})

app.post('/campground', async (req, res, next) => {
    try {
        const { title, location, description, price, image } = req.body.campground;
        console.log(req.body.campground)

        if (!title || !location || !description || !price || !image) {
            throw new customError(400, "All fields are required.");
        }

        const campground = await Campground.create({ ...req.body.campground });
        res.redirect(`/campground/${campground._id}`);
    } catch (e) {
        next(e);
    }
})

app.get('/campground/:id', async (req, res, next) => {
    try {
        const campground = await Campground.findById({ _id: req.params.id });
        res.render('campground/show', { campground });
    } catch (e) {
        next();
    }
})

app.get('/campground/:id/edit', async (req, res, next) => {
    try {
        const campground = await Campground.findById({ _id: req.params.id });
        res.render('campground/edit', { campground });
    } catch (e) {
        next(e);
    }
})

app.put('/campground/:id', async (req, res, next) => {
    try {
        await Campground.findByIdAndUpdate(req.params.id, { $set: { ...req.body.campground } });
        const campgrounds = await Campground.find({});
        res.redirect('/campgrounds');
    } catch (e) {
        next();
    }
})

app.delete('/campground/:id', async (req, res, next) => {
    try {
        await Campground.findByIdAndDelete(req.params.id);
        res.redirect('/campgrounds');
    } catch (e) {
        next();
    }
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next(new customError(404, 'Page not found'));
    // res.status(404).send('Sorry, that page cannot be found!');
})

app.use(errorHandler);

app.listen(PORT, (req, res) => {
    console.log("✅ Server running on http://localhost:3000");
})