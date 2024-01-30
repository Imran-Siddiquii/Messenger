
import { Router } from 'express';
import { accessChat } from '../controllers/ChatController.js';
import { authVerify } from '../middlewares/authVerify.js';

const chatRoutes = Router();

// create and access one-on-one chat
chatRoutes.post('/', authVerify, accessChat);

export default chatRoutes;
