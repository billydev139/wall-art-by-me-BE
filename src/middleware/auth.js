import Users from "../models/auth.js";
import Admins  from "../models/admin.js";
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


export const isAdmin = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(203).json({ message: "You must be logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await Admins.findById(decoded._id);
    if (req.user.accessToken != token) {
      return res.status(203).json({ message: "You must be logged in" });
    }
    
    if (token != req.user.accessToken){
      return res.status(203).json({ message: "You must be logged in" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};


export const isAuthorization = (roles = []) => {
  try {
    return async (req, res, next) => {
      if (!req.user) {
        return res.status(203).json({ message: "You must be logged in" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(203).json({ message: "Unauthorized to access" });
      }
      return next();
    };
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

export const sendToken = async (res, user, message) => {
  try {
    const token = user.getAuthToken();
    let admin = await Admins.findById(user._id);
    admin.accessToken = token;
    await admin.save();
    const content = {
      accessToken: token,
      customer: {
        UserName: user?.username,
        PhoneNo: user?.PhoneNo,
        role: user?.role,
        id: user?.id,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};