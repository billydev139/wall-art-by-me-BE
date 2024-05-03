import mongoose from "mongoose";
const artSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("artCollection", artSchema);
