import express from 'express';
import path from 'node:path';

const app = express();
const PORT = 3000;

app.set("view engine", 'ejs');
app.set('views', path.join(path.resolve(), 'views'));



app.get('/', (req, res) => {
    console.log('');
    res.send("Welcome to yelp-camp API");
});




app.listen(PORT, (req, res) => {
    console.log("Server running on http://localhost:3000")
})