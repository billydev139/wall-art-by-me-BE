import Admins from "../../models/admin.js";

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
