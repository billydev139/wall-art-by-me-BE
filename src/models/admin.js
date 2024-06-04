import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["ADMIN", "CONTENT_WRITER", "ORDER_PICKER"],
  },
  phone: {
    type: Number,
    required: [true, "Phone Number is required"],
    unique: true,
  },
  isDelete:{
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

adminSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

const Admins = mongoose.model("admin", adminSchema);

export default Admins;
