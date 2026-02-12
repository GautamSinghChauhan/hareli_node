const express = require('express');
const router = express.Router();
const UserRoute = require('./userRoutes');
const newsRoute = require('./newsRoutes');
const EventRoute = require('./eventRoutes');
const villageRoute = require('./villageusers');
const ChatRoute = require('./chatusers');

router.use(ChatRoute);

router.use(UserRoute);
router.use(newsRoute);
router.use(EventRoute);
router.use(villageRoute);

module.exports = router;
