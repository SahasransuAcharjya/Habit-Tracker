const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const env = require("../config/env");
const AppError = require("../utils/appError");
const {
  findUserByEmail,
  createUser,
} = require("../repositories/userRepository");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};

const registerUser = async ({ name, email, password, assistantTone }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists with this email.", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    passwordHash,
    assistantTone: assistantTone || "BALANCED",
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};