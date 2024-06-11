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
  imgURL: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    enum: ["Portrait", "Square", "Landscape"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("artcollection", artSchema);
