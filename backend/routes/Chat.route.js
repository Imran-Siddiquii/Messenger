import { Router } from 'express';
import { accessChat, createGroupChat, fetchChat } from '../controllers/ChatController.js';
import { authVerify } from '../middlewares/authVerify.js';

const chatRoutes = Router();

// create and access one-on-one chat
chatRoutes.post('/', authVerify, accessChat);
chatRoutes.get('/', authVerify, fetchChat);
chatRoutes.post('/group', authVerify, createGroupChat);

export default chatRoutes;
