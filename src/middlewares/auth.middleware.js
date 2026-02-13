const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized: Token missing or malformed"
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      error: "Unauthorized: Invalid or expired token"
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    next();
  };
};

// ✅ Correct export
module.exports = { verifyToken, authorize };
