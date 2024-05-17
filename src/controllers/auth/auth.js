import Users from "../../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const useLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if ( !email || !password) {
      return res.status(203).json({ error: "Email and Password are Required" });
    }
     email = email.toLowerCase();
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
       return res.status(203).json({ error: "User Not Exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
          return res.status(203).json({ error: "Invalid Email & Password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1000h",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const userRegister = async (req, res) => {
  try {
    let { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(203).json({ error: "All fields are required" });
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    // change email to lower case
    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return res.status(203).json({ error: "Enter Valid E-mail" });
    }
    const checkEmail = await Users.findOne({ email });
    const checkPhone = await Users.findOne({ phone });

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
    const newUser = new Users({ username, email,phone, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
