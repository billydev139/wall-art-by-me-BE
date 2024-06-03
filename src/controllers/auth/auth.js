import Admins from "../../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendToken} from "../../middleware/auth.js"


export const useLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    const regexEmail = /^\S+@\S+\.\S+$/;

    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return res.status(404).json({ message: "Enter Valid E-mail" });
    }

    const user = await Admins.findOne({ email }).select("+password");
    console.log("🚀 ~ useLogin ~ user:", user)
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

export const userRegister = async (req, res) => {
  try {
    console.log(req.body);
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

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
