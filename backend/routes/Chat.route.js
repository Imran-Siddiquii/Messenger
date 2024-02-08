import { Router } from 'express';
import {
  accessChat,
  addGroupMember,
  createGroupChat,
  fetchChat,
  removeGroupMember,
  renameGroup,
} from '../controllers/ChatController.js';
import { authVerify } from '../middlewares/authVerify.js';

const chatRoutes = Router();

// create and access one-on-one chat
chatRoutes.post('/', authVerify, accessChat);
chatRoutes.get('/', authVerify, fetchChat);
chatRoutes.post('/group', authVerify, createGroupChat);
chatRoutes.post('/group/add-member', authVerify, addGroupMember);
chatRoutes.post('/group/remove-member', authVerify, removeGroupMember);
chatRoutes.post('/group/rename', authVerify, renameGroup);

export default chatRoutes;
