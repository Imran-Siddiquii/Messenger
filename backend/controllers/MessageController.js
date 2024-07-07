import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) res.status(400).json({ message: 'Invalid input' });

  try {
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    message = await message.populate('sender', 'name profile_picture');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name profile_picture',
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.status(201).send(message);
  } catch (error) {
    res.status(400);
  }
};

const fetchAllMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name profile_picture')
      .populate('chat');
    res.status(200).send(messages);
  } catch (error) {
    res.status(400);
  }
};

export { fetchAllMessages, sendMessage };
