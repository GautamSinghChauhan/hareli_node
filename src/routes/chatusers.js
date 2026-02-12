// routes/ChatUsersRoutes.js
const express = require("express");
const router = express.Router();
const { registerChatUser, loginChatUser, getAllUsers, getUserProfile} = require("../controller/chatusers");
const verifyToken = require("../middlewares/auth.middleware");



// Route for registering a new chat user
router.post("/register", registerChatUser);
router.post("/login", loginChatUser);
router.get("/profile", verifyToken, getUserProfile);

 
router.get("/users", verifyToken, getAllUsers); 
router.get("/users/:id", verifyToken, getUserProfile); 

module.exports = router;
