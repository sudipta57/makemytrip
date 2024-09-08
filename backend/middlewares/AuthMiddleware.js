import jwt from "jsonwebtoken";
const AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.cookies.authtoken;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(authHeader, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

export default AuthMiddleware;
