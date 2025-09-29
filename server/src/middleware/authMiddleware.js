import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const authMiddleware = async (req, res, next) => {
  // 1. Reads the token from the secure httpOnly cookie
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    // 2. Verifies the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetches the complete user profile from the database
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }

    // 4. Attaches the FULL user object to req.user, which is what your controllers need
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

export default authMiddleware;