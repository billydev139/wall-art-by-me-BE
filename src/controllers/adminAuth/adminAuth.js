import Admin from "../../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(203).json({ error: "Email and Password are Required" });
    }
    email = email.toLowerCase();
    const user = await Admin.findOne({ email }).select("+password");

    if (!user) {
      return res.status(203).json({ error: "Admin Not Exist!" });
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

export const AdminRegister = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(203).json({ error: "All fields are required" });
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    // change email to lower case
    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return res.status(203).json({ error: "Enter Valid E-mail" });
    }
    const checkEmail = await Admin.findOne({ email });
    const checkPhone = await Admin.findOne({ phone });

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
    const newUser = new Users({ name, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

export const addAdmin = async (req, res) => {
  try {
    let { first_name, last_name, email, password, role } = req.body;

    const regexEmail = /^\S+@\S+\.\S+$/;

    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return sendResponse(res, false, "Enter Valid E-mail");
    }

    const regexPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!regexPassword.test(password)) {
      return sendResponse(
        res,
        false,
        "Password must be 6 to 16 characters & one Special Character one Uppercase one lowercase and one Number"
      );
    }

    // check if the user is already registered email & username
    const exist = await Admin.findOne({ email });

    if (exist) {
      return sendResponse(res, false, "Already exists");
    }

    // If the user not fill all the fields
    if (first_name.length < 2 || last_name < 2) {
      return sendResponse(res, false, "Minimum 3 Characters");
    }
    if (!role) {
      return sendResponse(res, false, "fields required");
    }

    // user password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const data = {
      first_name,
      last_name,
      role,
      email,
      password: hashPassword,
    };

    // sms sending in mobile
    // const client = new twilio(accountSid, authToken)
    // const info = await client.messages.create({
    //   body: 'test body',
    //   from: '+15005550006',
    //   to: '+923000060018',
    // })

    const user = new Admin(data);

    const meetingData = {
      managerId: user._id,
      role: user.role,
    };

    await user.save();
    await Meetings.create(meetingData);
    // send mail

    // set user token in cookies or headers
    sendToken(res, user, "Register Successfully");
  } catch (error) {
    return sendError(res, error);
  }
};

// loging  using username
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const regexEmail = /^\S+@\S+\.\S+$/;
    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return sendResponse(res, false, "Enter Valid E-mail");
    }

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!regex.test(password)) {
      return sendResponse(
        res,
        false,
        "Password must be 6 to 16 characters & one Special Character one Uppercase one lowercase and one Number"
      );
    }

    const user = await Admins.findOne({ email }).select("+password");
    if (!user || user.isDelete) {
      return sendResponse(res, false, "User not Exist!");
    }
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      return sendResponse(res, false, "invalid email & password");
    }

    return sendToken(res, user, "Login Success");
  } catch (error) {
    return sendError(res, error);
  }
};
