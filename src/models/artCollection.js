import mongoose from "mongoose";
const artSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artisticStyle: {
    type: String,
    required: true,
  },
  imgURLs: [
    {
      type: String,
      required: true,
    },
  ],
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    enum: ["Portrait", "Square", "Landscape"],
  },
  isFeatured:{
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("artcollection", artSchema);
