import artCollection from "../../models/artCollection.js";
import fs from "fs";
import Order from "../../models/order.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let publicPath = join(__dirname, "../../../public/artCollection");

// addArtCollection
export const addArt = async (req, res) => {
  try {
    if (req.files.length===0) {
      return res.status(400).json({ message: "Image Not Found" });
    }
    let name = req.body.name;
    let art = await artCollection.find({ name: name });
    if (art.length > 0) {
      return res.status(400).json({ message: "Art Already Exists" });
    }
    let imgURLs = [];
    req.files.forEach((element) => {
      imgURLs.push(element.filename);
    });
    const newArt = new artCollection({
      ...req.body,
      imgURLs: imgURLs,
    });
    await newArt.save();
    return res.status(200).json({ message: "Art Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Update Art Collection
export const updateArtById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the art by ID
    let art = await artCollection.findById(id);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    const updatedData = {
      ...art.toObject(),
      ...data,
      imgURL: req.file ? req.file.filename : art.imgURL,
    };

    Object.assign(art, updatedData);

    // Save the updated art
    const updatedArt = await art.save();

    // Return the updated art piece
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
    const imagePath = `${publicPath}/${deletedArt.imgURL}`;
    fs.unlink(imagePath, (err) => {
      console.log("🚀 ~ deleteArtById ~ imagePath:", imagePath);
      if (err) {
        console.error("Error deleting image file:", err);
      } else {
        console.log("Image file deleted successfully");
      }
    });
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
