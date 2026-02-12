// models/ChatUsers.js
const mongoose = require("mongoose");

// Define the schema for chat users
const chatUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model for the "chatusers" collection
module.exports = mongoose.model("chatusers", chatUserSchema);
