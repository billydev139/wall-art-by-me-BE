import artCollection from "../../models/artCollection.js";
import Cart from "../../models/cart.js";
import Users from "../../models/auth.js";
import Order from "../../models/order.js";
import { get } from "mongoose";
// get all the art collections
export const getArtCollection = async (req, res, next) => {
  try {
    let { page, aritisticStyle, ...rest } = req.query;
    let query = { ...rest };
    if (aritisticStyle !== undefined) {
      query.aritisticStyle = aritisticStyle;
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
  try {
    let subTotal = 0;
    let quantity = 0;
    const items = [];

    // Use a for...of loop to handle asynchronous operations
    for (const item of req.body.items) {
      console.log("🚀 ~ item:", item.artCollection);
      const id = item.artCollection;

      // Find the art collection item by ID
      const art = await artCollection.findById(id);
      //console.log("🚀 ~ placeOrder ~ art:", art)
      console.log("🚀 ~ art:", art.price);

      // If the art collection item is not found, throw an error
      if (!art) {
        throw new Error(
          `ArtCollection item with ID ${item.artCollection} not found`
        );
      }
       console.log("item.quantity is ", item.quantity);    
      // Calculate subtotal for the current item
      subTotal += parseInt(art.price) * parseInt(item.quantity);
      quantity += parseInt(item.quantity);
  

      // Add the processed item to the items array
      items.push({
        ...item,
        art,
      });
    }

    // Log the calculated subtotal
    console.log("🚀 ~ subTotal:", subTotal);

    // Create a new order with the processed items and subtotal
    const order = new Order({
      ...req.body,
      items,
      totalPrice: subTotal,
      quantity: quantity,
      // userId: req.user.id,
    });

    // Save the order to the database
    await order.save();

    // Send a success response
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
