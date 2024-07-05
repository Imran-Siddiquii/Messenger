import { Router } from 'express';
import { authVerify } from '../middlewares/authVerify.js';
import {
  fetchAllMessages,
  sendMessage,
} from '../controllers/MessageController.js';

const messageRoutes = Router();

// create and access one-on-one and group message
messageRoutes.post('/', authVerify, sendMessage);
messageRoutes.get('/:chatId', authVerify, fetchAllMessages);

export default messageRoutes;
