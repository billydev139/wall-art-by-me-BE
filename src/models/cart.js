import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  items: [
    {
      art: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artcollection",
      },
      name: {
        type: String,
        required: true,
      },
      aritisticStyle: {
        type: String,
        required: true,
      },
      frameSize: {
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
    },
  ],

  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("cart", cartSchema);
