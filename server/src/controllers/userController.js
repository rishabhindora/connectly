const {
  findUserById
} = require("../services/authService");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await findUserById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser
};