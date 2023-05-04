import { redisClient } from '../../helpers';
import { decodeToken } from '../../utils';

const isAuthenticated = async (req, res, next) => {
  function sendResponse() {
    return res.status(401).json({ code: 401, message: 'Please Login' });
  }
  try {
    const header = req.headers.authorization;
    if (!header) {
      return sendResponse();
    }
    const token = header.split(' ')[1];
    const userInfo = decodeToken(token);
    const { id } = userInfo;
    const redisToken = await redisClient.get(id);
    if (redisToken === token) {
      const isVerified = decodeToken(redisToken);
      if (!isVerified) {
        return sendResponse();
      }
      req.user = isVerified;
      return next();
    }
    return sendResponse();
  } catch (error) {
    res
      .status(400)
      .json({ code: 400, message: 'Bad Request.', error: error.message });
  }
};

export default isAuthenticated;
