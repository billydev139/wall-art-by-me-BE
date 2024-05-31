import artCollection from "../../models/artCollection.js";
import Cart from "../../models/cart.js";
import Users from "../../models/auth.js";
import Order from "../../models/order.js";
import OpenAI from "openai";
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

      console.log("THe item.posterFrame is ", item.posterFrameMaterial);
      if (item.posterFrameMaterial !== "NoFrame") {
        art.posterFrame.forEach((frame) => {
          //console.log("🚀   frame Options", frame)

          if (frame.material === item.posterFrameMaterial) {
            frameSize = frame.frameSize;
            frameSize = frame.price;
          }
        });
      } else {
        frameSize = 0;
      }

      if (item.frameOption !== "NoSize") {
        art.frameOption.forEach((frame) => {
          console.log("🚀   frame Options", frame);

          if (frame.size === item.size) {
            size = frame.price;
          }
        });
      } else {
        size = 0;
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

// imageGenerator
export const imageGenerator = async (req, res) => {
  let { prompt,size } = req.body;
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY,
    });
    async function imageGenerator() {
      const image = await openai.images.generate({
        model: process.env.OPENAI_MODEL,
        prompt: prompt,
        n: parseInt(process.env.OPENAI_N),
        size:size,
        quality: process.env.OPENAI_QUALITY,
        response_format: process.env.OPENAI_RESPONSE_FORMAT,
        style: process.env.OPENAI_STYLE,
      });

      console.log(image.data);
      let url = image.data[0].url
         // console.log("🚀 ~ imageGenerator ~ url:", url)
          return res
            .status(200)
            .json({ message: "image Generated  successfully", url: url });
    }

    imageGenerator();
 

  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
