import { connect } from 'mongoose';

import { config } from 'dotenv';
config();
// Access your MongoDB connection string from secrets
const mongoURI = process.env.MONGODB_URI;
const initializeDatabase = async () => {
  try {
    const connection = await connect(mongoURI, {});
    if (connection) {
      console.log('Connected Successfully'.underline.bold.bgYellow);
    }
  } catch (error) {
    console.log('Connection Failed', error.bgRed);
  }
};


export default initializeDatabase;
