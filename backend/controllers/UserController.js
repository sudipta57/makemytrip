import User from "../models/User.js"; // Use ES module import
import bcrypt from "bcrypt"; // Use ES module import
import jwt from "jsonwebtoken"; // Use ES module import

const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user) return res.status(404).json({ message: "User not found" });
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ user: user }, process.env.JWT_KEY);
  res.status(200).json({ message: "Login successful", authtoken: token });
};
const UserSignUp = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);

  // Check if the email already exists
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Check if the username already exists
  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const bcryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: bcryptedPassword,
      email,
    });

    const token = jwt.sign({ user: newUser }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      authtoken: token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const UserExist = (req, res) => {
  res.status(200).json({ userId: req.user.user.user_id });
};
export { UserLogin, UserSignUp, UserExist };
