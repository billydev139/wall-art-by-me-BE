import artCollection from "../../models/artCollection.js";
import Order from "../../models/order.js";
// get all the art collections
export const getArtCollection = async (req, res, next) => {
  try {
    const arts = await artCollection.find({}).sort({ name: 1 });
    return res.status(200).json({ message: "Get Art Successfully", arts });
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
      items :req.body.items,
      userId : req.userId,
    })
   
    await order.save()

    return res.status(200).json({ message: "Order Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
