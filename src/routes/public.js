import express from "express";
const router = express.Router();
import { getArtCollection } from "../controllers/public/public.js";

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
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Successfully retrieved art collections
 *       500:
 *         description: Internal Server Error
 */

router.route("/getArtCollection").get(getArtCollection);

export default router;
