import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ message: 'Invalid User' });
  }

  // find if both user has chat already and populate user with lastest message

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('lastestMessage');

  // is exists then populate user details without password

  isChat = await User.populate(isChat, {
    path: 'lastestMessage.sender',
    select: 'name pic phone_number',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // if chat does not exists then create a new chat between two user
    const chatData = {
      isGroupChat: false,
      chat: 'sender',
      users: [req.user._id, userId],
    };
    try {
      const createChat = await Chat.create(chatData);
      // after creating user send chat details
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        'users',
        '-password'
      );
      res.status(200).send(fullChat);
    } catch {
      res.status(400);
    }
  }
};

export { accessChat };
