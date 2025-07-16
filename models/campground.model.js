import mongoose, { Schema } from 'mongoose';

const campgroundSchema = new Schema({
    title: String,
    image: String,
    description: String,
    location: String,
    price: Number
});

const Campground = mongoose.model('Campground', campgroundSchema);

export default Campground;