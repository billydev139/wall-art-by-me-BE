import express from "express";
const router = express.Router();
import {
  addArt,
  deleteArtById,
  getArtById,
  updateArtById,
  getOrders,
  getOrder,
  updateOrder,
} from "../controllers/admin/admin.js";

import { profileImg } from "../middleware/storage.js";
/**
 *  @swagger
 *  tags:
 *    name: Admin
 *    description: APIs for managing art by admin
 */

/**
 * @swagger
 * /admin/addArt:
 *   post:
 *     summary: Add art user this enum for orientation ["portrait", "square", "Landscape"],
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               artisticStyle:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *               size:
 *                 type: string
 *               artist:
 *                 type: string
 *               description:
 *                 type: string
 *               orientation:
 *                 type: string
 *               frameOption:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: string
 *                       size:
 *                         type: string
 *                       type:
 *                         type: string
 *
 *
 *     responses:
 *       200:
 *         description: Art added successfully
 *       500:
 *         description: Internal Server Error
 */

router.route("/addArt").post(profileImg, addArt);

/**
 * @swagger
 * /admin/getArt/{id}:
 *   get:
 *     summary: Get art by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */
router.route("/getArt/:id").get(getArtById);

/**
 * @swagger
 * /admin/deleteArt/{id}:
 *   delete:
 *     summary: Delete art by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     responses:
 *       200:
 *         description: Art deleted successfully
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router.route("/deleteArt/:id").delete(deleteArtById);
/**
 * @swagger
 *swagger: "2.0"
 *info:
 *  title: Art Collection API
 *  description: API documentation for managing an art collection.
 *  version: 1.0.0
 *paths:
 *  /admin/updateArt/{id}:
 *    put:
 *      summary: Update an existing art piece
 *      tags:
 *        - Admin
 *      description: Endpoint to update an existing art piece in the collection.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *          description: ID of the art
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Name of the art piece
 *                  example: "Starry Night"
 *                aritisticStyle:
 *                  type: string
 *                  description: Artistic style of the art piece
 *                  example: "Post-Impressionism"
 *                frameOption:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      price:
 *                        type: string
 *                        description: Price of the frame option
 *                        example: "50"
 *                      size:
 *                        type: string
 *                        description: Size of the frame option
 *                        example: "20x30"
 *                      type:
 *                        type: string
 *                        description: Type of the frame option
 *                        example: "Wood"
 *                imgURL:
 *                  type: string
 *                  description: URL of the art piece image
 *                  example: "http://example.com/image.jpg"
 *                price:
 *                  type: string
 *                  description: Price of the art piece
 *                  example: "200"
 *                size:
 *                  type: string
 *                  description: Size of the art piece
 *                  example: "24x36"
 *                color:
 *                  type: string
 *                  description: Dominant color of the art piece
 *                  example: "Blue"
 *                artist:
 *                  type: string
 *                  description: Name of the artist
 *                  example: "Vincent van Gogh"
 *                description:
 *                  type: string
 *                  description: Description of the art piece
 *                  example: "A depiction of a starry night over a quiet town."
 *                orientation:
 *                  type: string
 *                  description: Orientation of the art piece
 *                  enum: [portrait, square, landscape]
 *                  example: "landscape"
 *      responses:
 *        '200':
 *          description: Art piece updated successfully
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: ID of the updated art piece
 *              name:
 *                type: string
 *              aritisticStyle:
 *                type: string
 *              frameOption:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    price:
 *                      type: string
 *                    size:
 *                      type: string
 *                    type:
 *                      type: string
 *              imgURL:
 *                type: string
 *              price:
 *                type: string
 *              size:
 *                type: string
 *              color:
 *                type: string
 *              artist:
 *                type: string
 *              description:
 *                type: string
 *              orientation:
 *                type: string
 *              createdAt:
 *                type: string
 *                format: date-time
 *        '400':
 *          description: Invalid input, object invalid
 *        '404':
 *          description: Art piece not found
 *        '500':
 *          description: Internal server error
 *definitions:
 *  Art:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      name:
 *        type: string
 *      aritisticStyle:
 *        type: string
 *      frameOption:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            price:
 *              type: string
 *            size:
 *              type: string
 *            type:
 *              type: string
 *      imgURL:
 *        type: string
 *      price:
 *        type: string
 *      size:
 *        type: string
 *      color:
 *        type: string
 *      artist:
 *        type: string
 *      description:
 *        type: string
 *      orientation:
 *        type: string
 *        enum: [portrait, square, landscape]
 *      createdAt:
 *        type: string
 *        format: date-time
 */

router.route("/updateArtById/:id").patch(profileImg, updateArtById);

// get orders
/**
 * @swagger
 * /admin/getOrders/:
 *   get:
 *     summary: This api is used to get the all order in admin side.The orderStatus is ["Pending", "Shipped", "Delivered"]
 *     tags: [Admin]
 *     parameters:
 *     - in: query
 *       name: page
 *       type: string
 *     - in: query
 *       name: orderStatus
 *       type: string
 *     - in: query
 *       name: aritisticStyle
 *       type: string
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router.route("/getOrders").get(getOrders);

// get single order
/**
 * @swagger
 * /admin/getOrder/{id}:
 *   get:
 *     summary: This api is used to get single order by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

//get Single Order
router.route("/getOrder/:id").get(getOrder);

//update Order

/**
 * @swagger
 * /admin/updateOrder/{id}:
 *   patch:
 *     summary: Update order status user this enum to update the status ["Pending", "Shipped", "Delivered"] by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Art updated successfully
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router.route("/updateOrder/:id").patch(updateOrder);

export default router;
