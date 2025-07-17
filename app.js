import express from 'express';
import methodOverride from 'method-override';
import engine from 'ejs-mate';
import path from 'node:path';
import connectDB from './config/db.js';
import Campground from './models/campground.model.js';


const app = express();
const PORT = 3000;

app.engine('ejs', engine);
app.set("view engine", 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
connectDB();

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

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

app.get('/campground/:id/edit', async (req, res) => {
    const campground = await Campground.findById({ _id: req.params.id });
    res.render('campground/edit', { campground });
})

app.put('/campground/:id/edit', async (req, res) => {
    const { title, location } = req.body.campground;
    await Campground.findByIdAndUpdate(req.params.id, { $set: { title: title, location: location } });
    const campgrounds = await Campground.find({});
    res.redirect('/campgrounds');;
})

app.delete('/campground/:id/delete', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
})

app.listen(PORT, (req, res) => {
    console.log("✅ Server running on http://localhost:3000");
})