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

  frameOption: [
    {
      price: {
        type: String,
      },
      size: {
        type: String,
      },
    },
  ],

  posterFrame: [
    {
      price: {
        type: String,
      },
      color: {
        type: String,
      },
      material: {
        type: String,
      },
    },
  ],
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
  color: [
    {
      type: String,
    },
  ],
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
    enum: ["Portrait", "Square", "Landscape"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("artcollection", artSchema);
