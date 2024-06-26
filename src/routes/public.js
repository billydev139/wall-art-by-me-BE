import express from "express";
const router = express.Router();
import {
  getArtCollection,
  placeOrder,
  addTOCart,
  updateCart,
  imageGenerator,
  downlodeAIImage,
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
 *         name: limit
 *         schema:
 *           type: string
 *         description: limit of doc you want to get
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         description: Filter by isFeatured
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
*   post:
*     summary: Submit an order
*     tags:
*       - Public
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               cartItems:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     frameSize:
*                       type: string
*                     posterFrameMaterial:
*                       type: string
*                     frameName:
*                       type: string
*                     quantity:
*                       type: integer
*                     size:
*                       type: string
*                     orientation:
*                       type: string
*                     specification:
*                       type: string
*                     artCollection:
*                       type: string
*                     frameExtras:
*                       type: string
*                     imgURL:
*                       type: string
*               firstName:
*                 type: string
*               lastName:
*                 type: string
*               customerName:
*                 type: string
*               email:
*                 type: string
*               shippingAddress:
*                 type: string
*               shippingOption:
*                 type: string
*           example:
*             cartItems:
*               - frameSize: "15*15"
*                 posterFrameMaterial: "Steel"
*                 frameName: "A5"
*                 quantity: 1
*                 size: "24x36"
*                 orientation: "Portrait"
*                 specification: "I need this image like Ashan sleep on 4pi"
*                 artCollection: "667926bb021d572b7f050a25"
*                 frameExtras: ""
*             firstName: "John"
*             lastName: "Doe"
*             customerName: "John Doe"
*             email: "john.doe@example.com"
*             shippingAddress: "123 Shipping St, Shipping City"
*             shippingOption: "Standard"
*     responses:
*       '200':
*         description: Order submitted successfully
*       '400':
*         description: Bad request, invalid data provided
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

/**
 * @swagger
 * /public/downlodeAIImage:
 *   post:
 *     summary: downlodeAIImage
 *     tags: [Public]
 *     description: downlodeAIImage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: url
 *                 example: https://oaidalleapiprodscus.blob
 *     responses:
 *       200:
 *         description: Image generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the generated image
 *       400:
 *         description: Bad request
 */
router.route("/imageGenerator").post(imageGenerator);

/**
 * @swagger
 * /public/imageGenerator:
 *   post:
 *     summary: Generate an image
 *     tags: [Public]
 *     description: Generate an image using OpenAI based on the provided prompt and size
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: string
 *                 description: Size of the image
 *                 example: 1024x1024
 *               prompt:
 *                 type: string
 *                 description: Description of the image to generate
 *                 example: A vibrant coral reef teeming with colorful fish
 *     responses:
 *       200:
 *         description: Image generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the generated image
 *       400:
 *         description: Bad request
 */

router.route("/downlodeAIImage").post(downlodeAIImage);

/**
 * @swagger
 * /public/testing:
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
 *         name: limit
 *         schema:
 *           type: string
 *         description: limit of doc you want to get
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         description: Filter by isFeatured
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

export default router;
