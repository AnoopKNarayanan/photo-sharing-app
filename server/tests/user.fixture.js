import mongoose from "mongoose";
import { ObjectId } from 'mongodb';

export const userId = new mongoose.Types.ObjectId().toString();

export const userInput = {
  email: "test@abc.com",
  name: "Test User",
  password: "Test@123"
};

export const userInputInvalidPassword = {
    email: "test@abc.com",
    name: "Test User",
    password: "test"
};

export const userInputInvalidEmail = {
    email: "test",
    name: "Test User",
    password: "Test@123"
};

export const userInputInvalidName = {
    email: "test@abc.com",
    password: "Test@123"
};

export const userPayload = {
  _id: new ObjectId('5dbff32e367a343830cd2f49'),
  name: "Test User",
  email: "test@abc.com",
  password: "Test@123",
};

export const invalidUserPayload = {
  _id: new ObjectId('5dbff32e367a343830cd2f51'),
  name: "XYZ User",
  email: "xyz@abc.com",
  password: "Test@123",
};

export const differentUser = {
  _id: new ObjectId('5dbff32e367a343830cd2f52'),
  name: "Second User",
  email: "second@abc.com",
  password: "Second@123",
};

export const photo = {
  name: 'test.jpg',
  data: new Buffer('ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00'),
  size: 207878,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'image/jpeg',
  md5: '5c3288d16414ccfe19b0d656b1a175a9'
};