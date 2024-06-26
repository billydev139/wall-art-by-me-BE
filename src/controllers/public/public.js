import artCollection from "../../models/artCollection.js";
import Frame from "../../models/frame.js";
import Cart from "../../models/cart.js";
import Users from "../../models/auth.js";
import Order from "../../models/order.js";
import OpenAI from "openai";
import imageDownloder from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// get all the art collections

export const getArtCollection = async (req, res, next) => {
  try {
    let {
      page,
      limit,
      aritisticStyle,
      orientation,
      isFeatured,
      color,
      ...rest
    } = req.query;
    let query = { ...rest };

    if (aritisticStyle !== undefined) {
      query.aritisticStyle = aritisticStyle;
    }
    if (isFeatured !== undefined) {
      query.isFeatured = true;
    }
    if (color !== undefined) {
      query.color = color;
    }
    if (orientation !== undefined) {
      query.orientation = orientation;
    }

    limit = limit ? parseInt(limit) : 12;
    page = page ? parseInt(page) : 1;

    let getOrders = await artCollection
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    let distinctColors = await artCollection.distinct("color");
    let artisticStyles = await artCollection.distinct("artisticStyle");
    const results = await artCollection.aggregate([
      {
        $group: {
          _id: "$artisticStyle",
          imgURLs: { $addToSet: "$imgURLs" },
        },
      },
      {
        $project: {
          _id: 0,
          artisticStyle: "$_id",
          imgURLs: {
            $reduce: {
              input: "$imgURLs",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $project: {
          artisticStyle: 1,
          ImgURL: { $arrayElemAt: ["$imgURLs", 0] },
        },
      },
    ]);

    let count = await artCollection.countDocuments(query);
    let content = {
      pages: Math.ceil(count / limit),
      total: count,
      content: getOrders,
    };

    return res.status(200).json({
      message: "Get Art Successfully",
      colors: distinctColors,
      artisticStyles: artisticStyles,
      imgURLs: results,
      content,
    });
  } catch (error) {
    next(error);
  }
};


export const placeOrder = async (req, res) => {
  try {
    let subTotal = 0;
    let totalOrderPrice = 0;
    let totalOrderQuantity = 0;
    let quantity = 0;
    let art;
    let itemArray = [];
    const orderItems = req.body.cartItems;

    for (const item of orderItems) {
      let itemPrice = 0;

      if (item.artCollection != "") {
        art = await artCollection.findById({ _id: item.artCollection });
        
     
        itemPrice = itemPrice + art.price;
      } else {
        itemPrice = itemPrice + 10;
      }

      let frameOption = await Frame.findOne();

      let framePriceMaterial;
      let frameSizePrice;
      let size;

      if (item.posterFrameMaterial != "NoMaterial") {
        frameOption.posterFrame.forEach((frame) => {
          if (frame.material === item.posterFrameMaterial) {
            itemPrice = itemPrice + frame.price;
          }
        });
      } else {
        frameSize = 0;
      }

      if (item.frameName !== "NoFrame") {
        frameOption.frameOption.forEach((frame) => {
          if (frame.name === item.frameName) {
            itemPrice = itemPrice + frame.price;
          }
        });
      } else {
        size = 0;
      }

      let artItem = {
        name: art ? art.name : "AI Art",
        artisticStyle: art ? art.artisticStyle : "",
        description: art ? art.description : item.description,
        color: art ? art.color : "",
        artist: art ? art.artist : "",
        imgURL: art && art.imgURLs ? art.imgURLs[0] : item.imgURL,
        ...item,
        totalItemPrice: itemPrice,
      };

      itemArray.push(artItem);
      totalOrderPrice = totalOrderPrice + itemPrice;
      totalOrderQuantity = totalOrderQuantity + item.quantity;
      totalOrderQuantity = parseInt(totalOrderQuantity);
    }

    const items = orderItems.map((item) => ({
      artCollection: item.artCollection,
      price: item.price,
      quantity: item.quantity,
    }));

    // Create the order object

    const order = {
      user: "req.user",
      cartItems: itemArray,
      totalPrice: totalOrderPrice,
      quantity: totalOrderQuantity,
      status: "Pending",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      shippingOption: req.body.shippingOption,
      shippingAddress: req.body.shippingAddress,
      createdAt: new Date(),
    };

    // Save the order to the database
    const newOrder = await Order.create(order);

    // Return the created order
    return res.status(200).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    return res.status(500).json({ message: error.message });
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
    items.forEach((item) => {});
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
    return res.status(500).json({ errorMessage: error.message });
  }
};

// imageGenerator
export const imageGenerator = async (req, res) => {
  try {
    let { prompt, size } = req.body;
    if (!prompt) {
      return res.status(400).json({ errorMessage: "Prompt is required." });
    }
    if (prompt.length > 4000) {
      return res.status(400).json({
        errorMessage: "Prompt exceeds the maximum length of 4000 characters.",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY,
    });
    async function imageGenerator() {
      const image = await openai.images.generate({
        model: process.env.OPENAI_MODEL,
        prompt: prompt,
        n: parseInt(process.env.OPENAI_N),
        size: size,
        quality: process.env.OPENAI_QUALITY,
        response_format: process.env.OPENAI_RESPONSE_FORMAT,
        style: process.env.OPENAI_STYLE,
      });

      let url = image.data[0].url;
      return res
        .status(200)
        .json({ message: "image Generated  successfully", url: url });
    }

    imageGenerator();
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// downloadAIImage
export const downlodeAIImage = async (req, res) => {
  let { url, filename } = req.body;

  try {
    if (!filename) {
      filename = path.basename(url);
    }

    const downloadDir = path.join(__dirname, "../../../public/");
    const filePath = path.resolve(downloadDir, "AICollection");
    const options = {
      url: url,
      dest: filePath,
    };

    imageDownloder
      .image(options)
      .then(({ filename: savedFilename }) => {
        const onlyFilename = path.basename(savedFilename);
        return res
          .status(200)
          .json({ message: "Image AddToCart Successfully", url: onlyFilename });
      })
      .catch((err) => {
        return res.status(500).json({ errorMessage: err.message });
      });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
