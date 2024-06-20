import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  cartItems: [
    {
      artCollection: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      // artisticStyle: {
      //   type: String,
      //   required: true,
      // },
      frameSize: {
        type: String,
        required: true,
      },
      frameName: {
        type: String,
        required: true,
      },
      // posterFrameColor: {
      //   type: String,
      //   required: true,
      // },
      // frameExtras: {
      //   type: String,
      //   required: true,
      // },
      posterFrameMaterial: {
        type: String,
        required: true,
      },

      imgURL: {
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
      specification: {
        type: String,
        required: true,
      },
      totalItemPrice: {
        type: Number,
        required: true,
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
  firstName: {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email: {
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
  shippingOption: {
    type: String,
    enum: ['Standard', 'Expedited', 'Overnight', 'International'],
    required: true
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

export default mongoose.model("Order", orderSchema);
