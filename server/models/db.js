import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL, await console.log('Mongo connected successfully'));