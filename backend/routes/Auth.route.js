import { Router } from 'express';
const authRouter = Router();
import {
  signUpController,
  loginController,
} from '../controllers/AuthController.js';

authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);

export default authRouter;
