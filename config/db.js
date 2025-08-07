/** @format */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(
      `✅ Database conneceted on ${mongoose.connection.name} at ${mongoose.connection.host}:${mongoose.connection.port}`
    );

    mongoose.connection.on(
      'error',
      console.error.bind(console, 'Database connection error')
    );
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
};

export default connectDB;
