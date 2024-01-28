import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authVerify = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    try {
      const decoded = jwt.verify(auth, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json('Invalid token');
    }
  } else {
    return res.status(401).json('You are not authenticated');
  }
};

export { authVerify };
