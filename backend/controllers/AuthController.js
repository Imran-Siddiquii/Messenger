import User from '../models/userModel.js';
import { genSalt, hash, compare } from 'bcrypt';
import json from 'jsonwebtoken';

const { sign } = json;
const secretKey = process.env.SECRET_KEY;

const signUpController = async (req, res) => {
  const body = req.body;
  if (Object.keys(body).length < 1) {
    return res.status(400).json({ message: 'Please fill the fields' });
  }
  try {
    const userList = await User.find({});
    const userExists = userList.find(
      (user) => user.phone_number == body.phone_number.toLowerCase()
    );
    if (userExists) {
      res.status(400).json({ message: 'Already a user' });
    } else {
      const salt = await genSalt(10);
      const hashPassword = await hash(body.password, salt);
      const user = { ...body, password: hashPassword };
      const savedUser = await new User(user);
      await savedUser.save();
      // creating a token
      const access_token = sign({ userID: savedUser._id }, secretKey);
      //remove password key
      const { _id, name, phone_number, profile_picture, createdAt, updatedAt } =
        savedUser;
      const newUser = {
        _id,
        name,
        phone_number,
        profile_picture,
        createdAt,
        updatedAt,
      };

      res.json({
        message: 'Registration Successful',
        access_token,
        user: newUser,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  const { phone_number, password } = req.body;
  const userExists = await User.findOne({ phone_number });

  if (!userExists) {
    return res.status(401).json({ message: 'User not found' });
  }
  try {
    const checkPassword = await compare(password, userExists.password);
    if (checkPassword) {
      // creating token
      const { _id, name, profile_picture } = userExists;
      const access_token = sign({ userID: userExists._id }, secretKey);
      return res.json({
        message: 'login successful',
        user: { _id, name, profile_picture },
        access_token,
      });
    } else {
      return res.status(400).json({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed 3' });
  }
};

export { signUpController, loginController };
