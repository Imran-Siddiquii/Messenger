import express ,{json} from 'express';
import initializeDatabase from './db/index.js';
import cors from 'cors'
import colors from 'colors';
import authRouter from './routes/Auth.route.js';
import userRoutes from './routes/User.route.js';
initializeDatabase();
const app = express();
app.use(json())
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/api/v1',authRouter);
app.use('/api/v1', userRoutes);

app.listen(PORT, () =>
  console.log(`Server Started On ${PORT}`.underline.bold.bgBlue)
);
