import mongoose from "mongoose";
const artSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aritisticStyle: {
    type: String,
    required: true,
  },

  frameOption: [
    {
      price: {
        type: String,
      },
      size: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  ],

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
  color: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    enum: ["portrait", "square", "Landscape"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("artcollection", artSchema);
