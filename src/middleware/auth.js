import Users from "../models/auth.js";
import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(203).json({ message: "You must be logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let data = await Users.findById(decoded.id);
    if (!data) {
      return res.status(203).json({ message: "You must be logged in" });
    }
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
