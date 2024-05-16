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
 * /admin/updateArt/{id}:
 *   patch:
 *     summary: Update art by ID
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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               imgURL:
 *                 type: string
 *               price:
 *                 type: number
 *               size:
 *                 type: string
 *               artist:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Art updated successfully
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router.route("/updateArt/:id").patch(updateArtById);

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
