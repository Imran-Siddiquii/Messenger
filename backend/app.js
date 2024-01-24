import express from 'express';
import initializeDatabase from './db/index.js';
import colors from 'colors';
initializeDatabase();
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server Started On ${PORT}`.underline.bold.bgBlue)
);
