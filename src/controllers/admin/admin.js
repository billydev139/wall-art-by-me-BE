import artCollection from "../../models/artCollection.js";
import fs from "fs";
import Order from "../../models/order.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Admins from "../../models/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let publicPath = join(__dirname, "../../../public/artCollection");

// addArtCollection
export const addArt = async (req, res) => {
  try {
    if (req.files.length === 0) {
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
    let imgURLs = [];
    req.files.forEach((element) => {
      imgURLs.push(element.filename);
    });
    const updatedData = {
      ...art.toObject(),
      ...data,
      imgURLs: imgURLs,
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
    deletedArt.imgURLs.forEach((imgURL) => {
      let imagePath = `${publicPath}/${imgURL}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res.status(404).json({ message: err.message });
        }
      });
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

    if (!update) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: `Order ${req.body.orderStatus}` });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// del single image

export const delSingleImage = async (req, res) => {
  try {
    const { id, image } = req.params;

    let art = await artCollection.findById(id);
    let imageArray = art.imgURLs;

    if (!imageArray.includes(image)) {
      return res.status(404).json({ message: "Image not found" });
    }
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }
    let imgURLs = art.imgURLs;
    let imagePath = `${publicPath}/${image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
    });

    let index = imgURLs.indexOf(image);

    if (index > -1) {
      imgURLs.splice(index, 1);
    }
    art.imgURLs = imgURLs;
    await art.save();
    return res.status(200).json({ message: "Image Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// myTeam
export const myTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const adminId = req.query.id;
    let admin;
    if (adminId) {
      admin = await Admins.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      return res.status(200).json({ message: "Admin found", admin });
    } else {
      admin = await Admins.find();
      return res.status(200).json({ message: "All Team Members", admin });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Delete an admin by ID
export const deleteAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const adminId = req.params.id;
    if (!adminId) {
      return res.status(404).json({ message: "ID not found" });
    }
    const admin = await Admins.findByIdAndDelete(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ message: "Admin deleted", admin });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Edit an admin by ID
export const editAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const adminId = req.params.id;
    if (!adminId) {
      return res.status(404).json({ message: "ID not found" });
    }
    const updates = req.body;
    let phone = await Admins.find({ phone: req.body.phone });
    if (phone.length > 0) {
      return res.status(404).json({ message: "Phone number already exists" });
    }
    let email = await Admins.find({ email: req.body.email });
    if (email.length > 0) {
      return res.status(404).json({ message: "Email Already Exists" });
    }

    const admin = await Admins.findByIdAndUpdate(adminId, updates, {
      new: true,
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ message: "Admin updated", admin });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

//adminRegister 
export const adminRegister = async (req, res) => {
  try {
    let { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password || !role) {
      return res.status(203).json({ error: "All fields are required" });
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    // change email to lower case
    email = email.toLowerCase();

    if (!regexEmail.test(email)) {
      return res.status(203).json({ error: "Enter Valid E-mail" });
    }
    const checkEmail = await Admins.findOne({ email });
    const checkPhone = await Admins.findOne({ phone });

    if (checkEmail) {
      return res.status(203).json({ error: "Email Already exists" });
    }
    if (checkPhone) {
      return res.status(203).json({ error: "Phone Number Already exists" });
    }
    // user password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    password = hashPassword;
    // Create a new user
    const newUser = new Admins({ username, email, phone, password, role });
    await newUser.save();

    res.status(201).json({ message: `${role} Registered Successfully` });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};