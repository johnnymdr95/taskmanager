const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.userId = decoded.userId; // Attach userId to request
    next();
  });
}

module.exports = authenticate;
