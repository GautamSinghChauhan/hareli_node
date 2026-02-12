// controllers/VillageUsersController.js
const bcrypt = require("bcrypt");
const VillageUser = require("../models/villageusers");
// Function to register a new village user
const registerVillageUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, villageName } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user with the same email already exists
    const existingUser = await VillageUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance for village users
    const newVillageUser = new VillageUser({
      username,
      email,
      password: hashedPassword,
      villageName,
    });

    // Save the user to the database
    await newVillageUser.save();

    return res.status(201).json({ message: "Village user registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to register village user" });
  }
};

module.exports = { registerVillageUser };
