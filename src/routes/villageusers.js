// routes/VillageUsersRoutes.js
const express = require("express");
const router = express.Router();
const VillageUsersController = require("../controller/villageusers");

// Register a new village user
router.post("/register", VillageUsersController.registerVillageUser);

module.exports = router;
