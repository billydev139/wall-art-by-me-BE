import mongoose from "mongoose";
const frameSchema = mongoose.Schema({
  frameOption: [
    {
      price: {
        type: Number,
      },
      size: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  frameExtras: {
    type: String,
    default: "Mounted",
    required: true,
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
  
});

export default mongoose.model("frame", frameSchema);
