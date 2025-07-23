/** @format */

import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: password,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
