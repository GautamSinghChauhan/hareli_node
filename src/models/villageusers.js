// models/VillageUsers.js
const mongoose = require("mongoose");

// Define the schema for village users
const villageUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    villageName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model for the "villageusers" collection
module.exports = mongoose.model("villageusers", villageUserSchema);
