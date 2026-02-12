const ChatUser = require("../models/ChatUsers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new chat user
const registerChatUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await ChatUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new chat user
    const newChatUser = new ChatUser({ name, email, password: hashedPassword });

    // Save the user to the database
    await newChatUser.save();

    // // Generate a JWT token
    // const token = jwt.sign(
    //   { userId: newChatUser._id, email: newChatUser.email },
    //   JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    return res.status(201).json({
      message: "User registered successfully! Please log in to continue."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register chat user" });
  }
};

// Login a chat user
const loginChatUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await ChatUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

     // Generate an Access Token
     const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Optionally generate a Refresh Token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to log in" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await ChatUser.find();
    return res.status(200).json({ 
      message: "Users fetched successfully",
      totalUsers: users.length,
      users, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get users' });
  }
  
};

const getUserProfile = async (req, res) => {
  try {
    // Fetch user from the database (optional, if more details are needed)
    const user = await ChatUser.findById(req.userData.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User profile data fetched successfully",
      user: {
        userId: user._id,
        email: user.email,
        name: user.name, // Ensure name is included
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};





module.exports = { registerChatUser, loginChatUser, getAllUsers, getUserProfile };
