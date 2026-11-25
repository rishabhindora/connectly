const { verifyToken } = require("../utils/jwt");
const { AUTH_COOKIE_NAME } = require("../config/authCookie");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      console.log(token)
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication"
    });
  }
};

module.exports = authMiddleware;