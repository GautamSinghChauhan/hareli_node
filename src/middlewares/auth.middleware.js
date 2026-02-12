const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Set req.userData with user data from the token
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyToken;
