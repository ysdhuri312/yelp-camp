const express = require("express");
const colors = require("colors");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { /* useNewUrlParser: true, useCreateIndex: true, */ useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database Connected'.bgCyan);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})



app.listen(3000, () => {
    console.log('Serving on Port 3000'.bgMagenta);
})