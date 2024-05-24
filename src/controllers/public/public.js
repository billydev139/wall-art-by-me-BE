import artCollection from "../../models/artCollection.js";
import Cart from "../../models/cart.js";
import Users from "../../models/auth.js";
import Order from "../../models/order.js";
import { get } from "mongoose";
import { parse } from "dotenv";
// get all the art collections
export const getArtCollection = async (req, res, next) => {
  try {
    let { page, aritisticStyle, orientation, color, ...rest } = req.query;
    let query = { ...rest };
    if (aritisticStyle !== undefined) {
      query.aritisticStyle = aritisticStyle;
    }
    if (color !== undefined) {
      query.color = color;
    }
    if (orientation !== undefined) {
      query.orientation = orientation;
    }
    let limit = 12;
    page?.length > 0 ? page : 1;
    let getOrders = await artCollection
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (getOrders.length < 0) {
      return res.status(404).json({ message: "Art not found" });
    }
    let count = await artCollection.find(query).countDocuments();
    let content = {
      pages: Math.ceil(count / limit),
      total: count,
      content: getOrders,
    };
    return res.status(200).json({ message: "Get Art Successfully", content });
  } catch (error) {
    next(error);
    //return res.status(500).json({ error: error.message });
  }
};

// place order
export const placeOrder = async (req, res) => {
  //console.log("🚀 ~ placeOrder ~ req:", req.body);
  try {
    let subTotal = 0;
    let quantity = 0;
    const items = [];
    for (const item of req.body.cartItems) {
      const id = item.artCollection;
      const art = await artCollection.findById(id);
      //console.log("🚀 ~ placeOrder ~ art:", art)
      let frameSize;
      let size;
      if (item.posterFrame !== "NoFrame") {
        art.posterFrame.forEach((frame) => {
          //console.log("🚀   frame Options", frame)

          if (frame.frameSize === item.posterFrame) {
            frameSize = frame.frameSize;
            frameSize = frame.price;
          }
        });
      }

      if (item.frameOption !== "NoSize") {
        art.frameOption.forEach((frame) => {
          console.log("🚀   frame Options", frame);

          if (frame.size === item.size) {
            size = frame.price;
          }
        });
      }

      if (!art) {
        throw new Error(
          `ArtCollection item with ID ${item.artCollection} not found`
        );
      }
      console.log("The price of posterFrameColor option is ", frameSize);
      console.log("The price of frame option is ", size);
      subTotal +=
        parseInt(size) * parseInt(item.quantity) + parseInt(frameSize);
      quantity += parseInt(item.quantity);

      items.push({
        ...item,
        art,
      });
    }

    console.log("🚀 ~ subTotal:", subTotal);
  
    const order = new Order({
      ...req.body,
      items,
      totalPrice: subTotal,
      quantity: quantity,
    });

    await order.save();

    return res
      .status(200)
      .json({ message: "Order saved successfully", totalPrice: subTotal });
  } catch (error) {
    console.error("Error in placeOrder:", error.message);
    return res.status(500).json({ errorMessage: error.message });
  }
};

// addTOCart
export const addTOCart = async (req, res) => {
  try {
    let data = await Users.findById(req.user._id);
    if (!data) {
      return res.status(203).json({ message: "You must be logged in" });
    }
    let { items } = req.body;
    items.forEach((item) => {
      console.log("🚀 Cart items ", item);
    });
    let cart = new Cart({
      ...req.body,
      userId: req.user._id,
    });

    await cart.save();

    return res.status(200).json({ message: "Cart Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// update Cart
export const updateCart = async (req, res) => {
  try {
    let { item } = req.body;
    let cart = await Cart.find({ userId: req.params.id });

    cart.forEach((element) => {
      element.items.push(item);
      element.save();
    });
    return res.status(200).json({ message: "Cart Update successfully" });
  } catch (error) {
    console.log("🚀 ~ updateCart ~ error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};
