import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("========== AUTH CHECK ==========");
    console.log("Cookie token exists:", !!token);

    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated. Token is missing.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        message: "JWT_SECRET is not configured.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded token:", decoded);

    if (!decoded?.userId) {
      return res.status(401).json({
        message: "Invalid token. User ID is missing.",
      });
    }

    req.userId = decoded.userId;

    next();

  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default isAuth;