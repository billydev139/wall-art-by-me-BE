import express from "express";
const router = express.Router();
import {
  getArtCollection,
  placeOrder,
  addTOCart,
  updateCart,
} from "../controllers/public/public.js";
import { isAuth } from "../middleware/auth.js";
/**
 *  @swagger
 *  tags:
 *    name: Public
 *    description: APIs for public access
 */


/**
 * @swagger
 * /public/getArtCollection:
 *   get:
 *     summary: Get art collections
 *     tags: 
 *       - Public
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Page number for pagination
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: artisticStyle
 *         schema:
 *           type: string
 *         description: Filter by artistic style
 *     responses:
 *       200:
 *         description: Successfully retrieved art collections
 *       500:
 *         description: Internal Server Error
 */

router.route("/getArtCollection").get(getArtCollection);


/**
 * @swagger
 * /public/placeOrder:
 * paths:
 *   /public/placeOrder:
 *     post:
 *       summary: Create a new order
 *       tags: [Public]
 *       requestBody:
 *         description: Order details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       responses:
 *         '201':
 *           description: Order created successfully
 *         '400':
 *           description: Invalid input
 * components:
 *   schemas:
 *     items:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "609d098ad2a4d806b8b13b5c"
 *           description: Example ObjectId from the art collection
 *         aritisticStyle:
 *           type: string
 *           example: "Impressionism"
 *         name:
 *           type: string
 *           example: "nigth star"
 *         frameSize:
 *           type: string
 *           example: "Large"
 *         imgURL:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         price:
 *           type: string
 *           example: "1000"
 *         size:
 *           type: string
 *           example: "24x36"
 *         color:
 *           type: string
 *           example: "Blue"
 *         artist:
 *           type: string
 *           example: "Vincent van Gogh"
 *         description:
 *           type: string
 *           example: "Starry Night"
 *         orientation:
 *           type: string
 *           example: "portrait"
 *     Order:
 *       type: object
 *       properties:
 *         items:
 *           $ref: '#/components/schemas/Art'
 *         quantity:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: number
 *           example: 1000
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         customerEmail:
 *           type: string
 *           example: "john@example.com"
 *         shippingAddress:
 *           type: string
 *           example: "123 Main St, City, Country"
 *         orderStatus:
 *           type: string
 *           example: "Pending"
 */
router.route("/placeOrder").post(placeOrder);

/**
 * @swagger
 * /public/addTOCart:
 * paths:
 *   /public/addTOCart:
 *     post:
 *       summary: This api is used to addTOCart
 *       tags: [Public]
 *       requestBody:
 *         description: addTOCart details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       responses:
 *         '201':
 *           description: addTOCart created successfully
 *         '400':
 *           description: Invalid input
 * components:
 *   schemas:
 *     Art:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "609d098ad2a4d806b8b13b5c"
 *           description: Example ObjectId from the art collection
 *         artisticStyle:
 *           type: string
 *           example: "Impressionism"
 *         frameSize:
 *           type: string
 *           example: "Large"
 *         imgURL:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         price:
 *           type: string
 *           example: "1000"
 *         size:
 *           type: string
 *           example: "24x36"
 *         color:
 *           type: string
 *           example: "Blue"
 *         artist:
 *           type: string
 *           example: "Vincent van Gogh"
 *         description:
 *           type: string
 *           example: "Starry Night"
 *         orientation:
 *           type: string
 *           example: "portrait"
 *     Order:
 *       type: object
 *       properties:
 *         art:
 *           $ref: '#/components/schemas/Art'
 *         quantity:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: number
 *           example: 1000
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         customerEmail:
 *           type: string
 *           example: "john@example.com"
 *         shippingAddress:
 *           type: string
 *           example: "123 Main St, City, Country"
 *         orderStatus:
 *           type: string
 *           example: "Pending"
 */
router.route("/addTOCart").post(isAuth, addTOCart);

router.route("/updateCart/:id").post(isAuth, updateCart);

export default router;
