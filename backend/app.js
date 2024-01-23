import express from 'express';
import initializeDatabase from './db/index.js';

initializeDatabase();
const app = express();

const PORT = 6000;

app.listen(PORT, () => console.log(`Server Started On ${PORT}`));
