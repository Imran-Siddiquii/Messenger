// search user  with name and phone number

import { Router } from 'express';
import { searchUser } from '../controllers/UserController.js';
import { authVerify } from '../middlewares/authVerify.js';

const userRoutes = Router();

userRoutes.post('/user', authVerify, searchUser);

export default userRoutes;
