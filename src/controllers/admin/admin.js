import artCollection from "../../models/artCollection.js";
import fs from "fs";
import Order from "../../models/order.js";
// addArtCollection
export const addArt = async (req, res) => {
  try {
    let data = req.body;
    console.log("🚀 ~ addArt ~ data:", data)
    let name = req.body.name;
    let art = await artCollection.find({ name: name });
    if (art.length > 0) {
      return res.status(400).json({ message: "Art Already Exists" });
    }
    const newArt = new artCollection({
      name: data.name,
      category: data.category,
      imgURL: req.file ? req.file.filename : "empty-avatar.png",
      price: data.price,
      size: data.size,
      artist: data.artist,
      aritisticStyle: data.aritisticStyle,
      orientation: data.orientation,
      description: data.description,
      frameOption: data.frameOption,
    });
    await newArt.save();
    return res.status(200).json({ message: "Art Saved successfully" });
  } catch (error) {
    console.log("🚀 ~ addArt ~ error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Update Art Collection
export const updateArtById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedArt = await artCollection.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    return res
      .status(200)
      .json({ message: "Art updated successfully", updatedArt });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Delete Art Collection
export const deleteArtById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArt = await artCollection.findByIdAndDelete(id);

    if (!deletedArt) {
      return res.status(404).json({ message: "Art not found" });
    }
    // const imagePath = `../../../public/artCollection/${deletedArt.imgURL}`;
    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.error("Error deleting image file:", err);
    //   } else {
    //     console.log("Image file deleted successfully");
    //   }
    // });
    return res.status(200).json({ message: "Art deleted successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Get Art Collection by ID
export const getArtById = async (req, res) => {
  try {
    const { id } = req.params;

    const art = await artCollection.findById(id);

    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    return res.status(200).json({ message: "Art found", art });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// getOrders api
export const getOrders = async (req, res) => {
  try {
    let { page, orderStatus, aritisticStyle, ...rest } = req.query;

    let query = { ...rest };
    if (orderStatus !== undefined) {
      query.orderStatus = orderStatus;
    }

    if (aritisticStyle !== undefined) {
      {
        items: {
          $elemMatch: {
            aritisticStyle: aritisticStyle;
          }
        }
      }
    }
    let limit = 12;
    page?.length > 0 ? page : 1;
    let getOrders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (getOrders.length < 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    let count = await Order.find(query).countDocuments();
    let content = {
      pages: Math.ceil(count / limit),
      total: count,
      content: getOrders,
    };
    return res.status(200).json({ message: "Get All Orders", content });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

//get Single Order

export const getOrder = async (req, res) => {
  try {
    let getOrder = await Order.findById(req.params.id);
    if (getOrder.length < 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Get Order", getOrder });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// updateOrder

export const updateOrder = async (req, res) => {
  try {
    const update = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true }
    );

    console.log("🚀 ~ updateOrder ~ Update:", update);
    if (!update) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: `Order ${req.body.orderStatus}` });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
