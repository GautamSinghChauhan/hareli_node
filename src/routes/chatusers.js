// routes/ChatUsersRoutes.js
const express = require("express");
const router = express.Router();
const { registerChatUser, loginChatUser, getAllUsers, getUserProfile} = require("../controller/chatusers");
const { verifyToken } = require('../middlewares/auth.middleware');




// Route for registering a new chat user
router.post("/chat/register", registerChatUser);
router.post("/chat/login", loginChatUser);
router.get("/chat/profile", verifyToken, getUserProfile);

 
router.get("/users", verifyToken, getAllUsers); 
router.get("/users/:id", verifyToken, getUserProfile); 

module.exports = router;
