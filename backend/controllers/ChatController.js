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
    .populate('latestMessage');

  // is exists then populate user details without password

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
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

const fetchChat = async (req, res) => {
   try {
     await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
       .populate('users', '-password')
       .populate('groupAdmin', '-password')
       .populate('latestMessage')
       .sort({ updatedAt: -1 })
       .then(async (results) => {
         results = await User.populate(results, {
           path: 'latestMessage.sender',
           select: 'name pic',
         });
         res.status(200).send(results);
       });
   } catch (error) {
     res.status(400);
     throw new Error(error.message);
   }

};

const createGroupChat = async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res.status(401).json({ message: 'Please fill all the fields' });
  }
  const users = req.body.users;


  if (users.length < 2) {
    res
      .status(401)
      .json({ message: 'Atleast 2 members required to make a group' });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chat: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.find({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    res.status(200).send(fullGroupChat);
  } catch (error) {
    throw new Error(error.message);
  }
};

const addGroupMember = async (req, res) => {
  const { groupId, userId } = req.body;

  if (!groupId || !userId) {
    res.send('Please fill all the fields');
  }
  const addMember = await Chat.findByIdAndUpdate(
    groupId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate({
      path: 'users',
      match: { _id: { $ne: req.user._id } }, // Exclude the user being removed
      select: '-password',
    })
    .populate('groupAdmin', '-password');
  res.send(addMember);
};

const removeGroupMember = async (req, res) => {
  const { groupId, userId } = req.body;

  if (!groupId || !userId) {
    res.send('Please fill all the fields');
  }
  const removeMember = await Chat.findByIdAndUpdate(
    groupId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate({
      path: 'users',
      match: { _id: { $ne: req.user._id } }, // Exclude the user being removed
      select: '-password',
    })
    .populate('groupAdmin', '-password');
  res.send(removeMember);
};

const renameGroup = async (req, res) => {
  const { groupId, chatName } = req.body;
  if (!groupId || !chatName) {
    res.send('Please fill all the fields');
  }
  const updated = await Chat.findByIdAndUpdate(
    groupId,
    { chat: chatName },
    { new: true }
  );
  res.send(updated);
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.body;

  try {
    const deletedChat = await Chat.findOneAndDelete({ _id: groupId });

    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the chat' });
  }
};
export {
  accessChat,
  fetchChat,
  createGroupChat,
  addGroupMember,
  removeGroupMember,
  renameGroup,
  deleteGroup,
};
