import artCollection from "../../models/artCollection.js";
import Cart from "../../models/cart.js";
import Order from "../../models/order.js";
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
    let order = new Order({
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      items: req.body.items,
      userId: req.userId,
    });

    await order.save();

    return res.status(200).json({ message: "Order Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// addTOCart
export const addTOCart = async (req, res) => {
  try {
    let cart = new Cart({
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      items: req.body.items,
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
    console.log("🚀 ~ updateCart ~ item:", item)
    let cart = await Cart.find({ userId: req.user.id });

    cart.forEach((element) => {
      element.items.push({
        _id: "609d098ad2a4d806b8b13b5c", // Example ObjectId from the artcollection
        aritisticStyle: "Impressionism",
        name: "Danish Riaz",
        frameSize: "Large",
        imgURL: "https://example.com/image.jpg",
        price: "1000",
        size: "24x36",
        color: "Blue",
        artist: "Vincent van Gogh",
        description: "Starry Night",
        orientation: "portrait",
      });
      element.save();
      console.log("🚀 ~ abc ~ cart:", element);
    });
  } catch (error) {
     console.log("🚀 ~ updateCart ~ error:", error)
     return res.status(500).json({ errorMessage: error.message });
  }
};
// async function abc() {

// }
// abc();
