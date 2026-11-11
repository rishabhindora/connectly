const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const {
  findUserByEmail,
  findUserByUsername,
  createUser
} = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const {
      name,
      username,
      email,
      password
    } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const existingEmail = await findUserByEmail(normalizedEmail);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const existingUsername =
      await findUserByUsername(normalizedUsername);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name: name.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};
 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const passwordMatches =
      await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken({
      userId: user.id
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};