const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ error: "Failed to authenticate token" });
    }
  };
};

module.exports = verifyRole;
