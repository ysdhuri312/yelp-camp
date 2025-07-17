import express from 'express';
import path from 'node:path';
import connectDB from './config/db.js';
import Campground from './models/campground.model.js';


const app = express();
const PORT = 3000;

app.set("view engine", 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    console.log('');
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds });
})

app.get('/campground/new', (req, res) => {
    res.render('campground/new');
})

app.post('/campground', async (req, res) => {
    const campground = await Campground.create({ ...req.body })
    res.redirect(`/campground/${campground._id} `);
})

app.get('/campground/:id', async (req, res) => {
    const campground = await Campground.findById({ _id: req.params.id });
    res.render('campground/show', { campground });
})


app.listen(PORT, (req, res) => {
    console.log("✅ Server running on http://localhost:3000");
})