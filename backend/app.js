import express ,{json} from 'express';
import initializeDatabase from './db/index.js';
import cors from 'cors'
import colors from 'colors';
import authRouter from './routes/Auth.route.js';
initializeDatabase();
const app = express();
app.use(json())
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/api/v1',authRouter);

app.listen(PORT, () =>
  console.log(`Server Started On ${PORT}`.underline.bold.bgBlue)
);
