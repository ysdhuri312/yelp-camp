const mongoose = require("mongoose");
const colors = require("colors");


const connectDB = async () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Connection Error:".bgRed));
        db.once("open", () => {
            console.log("Database Connected".bgCyan);
        });
    } catch (e) {
        next(e);
    }
}

module.exports = connectDB;


