import Admins from "../../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendToken } from "../../middleware/auth.js";

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    const regexEmail = /^\S+@\S+\.\S+$/;
    email = email.toLowerCase();
    if (!regexEmail.test(email)) {
      return res.status(404).json({ message: "Enter Valid E-mail" });
    }
    const user = await Admins.findOne({ email }).select("+password");
    if (!user || user.isDelete) {
      return res.status(404).json({ message: "invalid email & password" });
    }
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "invalid email & password" });
    }
    return sendToken(res, user, "Login Success");
  } catch (error) {
    return res.status(504).json({ message: error.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    let { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password || !role) {
      return res.status(203).json({ error: "All fields are required" });
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    // change email to lower case
    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return res.status(203).json({ error: "Enter Valid E-mail" });
    }
    const checkEmail = await Admins.findOne({ email });
    const checkPhone = await Admins.findOne({ phone });

    if (checkEmail) {
      return res.status(203).json({ error: "Email Already exists" });
    }
    if (checkPhone) {
      return res.status(203).json({ error: "Phone Number Already exists" });
    }
    // user password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    password = hashPassword;
    // Create a new user
    const newUser = new Admins({ username, email, phone, password, role });
    await newUser.save();

    res.status(201).json({ message: `${role} Registered Successfully` });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

//logOut API
export const logOut = async (req, res) => {
  try {
    let admin = await Admins.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }
    admin.accessToken = "";
    const updatedData = {
      ...admin.toObject(),
    };
    Object.assign(admin, updatedData);
    await admin.save();
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
