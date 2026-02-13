// // routes/newsRoutes.js
// const express = require('express');
// const router = express.Router();
// const NewsController = require('../controller/NewsController');

// router.post('/news', NewsController.createNews);
// router.put('/news/:id', NewsController.updateNews);
// router.delete('/news/:id', NewsController.deleteNews);
// router.get('/getallnews', NewsController.getallnews);
// router.get('/news/:id', NewsController.getNewsById);


// module.exports = router;


// const express = require("express");
// const router = express.Router();

const express = require("express");
const router = express.Router();

const { verifyToken, authorize } = require("../middlewares/auth.middleware");
const newsController = require("../controller/NewsController");


// 📰 Public route – sab dekh sakte hain
router.get("/getallnews", newsController.getAllNews);


// ➕ News add karne ke liye (sirf ADMIN ya SUPER_ADMIN)
router.post(
  "/createNews",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  newsController.createNews
);


// ✏️ Update news (sirf ADMIN ya SUPER_ADMIN)
router.put(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  newsController.updateNews
);


// ❌ Delete news (sirf ADMIN ya SUPER_ADMIN)
router.delete(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  newsController.deleteNews
);

module.exports = router;


