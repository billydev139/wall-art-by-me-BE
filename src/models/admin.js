import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  name: {
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
    required: true,
    enum: ["admin", "contentWriter", "orderPicker"],
    default: "user",
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  
});

const Admins = mongoose.model("admin", adminSchema);

export default Admins;
