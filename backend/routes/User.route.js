// search user  with name and phone number

import express from 'express';
import { searchUser } from '../controllers/UserController.js';
import { authVerify } from '../middlewares/authVerify.js';

const userRoutes = express();

userRoutes.post('/user', authVerify, searchUser);

export default userRoutes;
