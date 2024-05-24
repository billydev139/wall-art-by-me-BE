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
        type: Number,
      },
      size: {
        type: String,
      },
      name:{
        type: String,
      }
    },
  ],
  frameExtras :{
    type : String,
    default :"Mounted",
    required : true,
  },
  posterFrame: [
    {
      price: {
        type: Number,
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
