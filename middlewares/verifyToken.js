const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const jt = await jwt.verify(token, "123");
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = verifyToken;
