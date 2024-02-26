import User from '../models/userModel.js';

const searchUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { phone_number: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  if (Object.keys(keyword)?.length > 0) {
    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select('-password');
    res.send(users);
  } else {
    res.status(204).send();
  }
};

export { searchUser };
