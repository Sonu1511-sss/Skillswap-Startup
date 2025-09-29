// server/src/config/database.js

import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = async () => {
  const URL = process.env.MONGODB_URL;

  if (!URL) {
    console.error("Error: MONGODB_URL ");
    process.exit(1); 
  }

  try {
    await mongoose.connect(URL);
    console.log('DB Connected Successfully');
  } catch (error) {
    console.error('Error in DB Connection:', error.message);
    process.exit(1);
  }
};

export default dbConnect;

