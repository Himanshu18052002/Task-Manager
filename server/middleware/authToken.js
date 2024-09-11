const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
      console.log("Error occurred in authToken middleware: ", ex.message);
      console.log("Error details: ", ex);
      return res.status(401).json({ message: "Invalid token.", error: ex });
  }
};

module.exports = authToken;
