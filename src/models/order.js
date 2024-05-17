import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  items: [
    {
      art: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artcollection",
      },
      name:{
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
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
