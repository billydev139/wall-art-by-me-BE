import express from "express";
const router = express.Router();
import { addArt } from "../controllers/admin/admin.js";

/**
 *  @swagger
 *  tags:
 *    name: admin
 */

/**
 * @swagger
 * /admin/admin:
 *   post: 
 *     summary: This api is used to add the art by admin
 *     tags: [Admin]
 *     parameters:
 *     - in: path
 *       name: symbol
 *       type: string
 *     - in: path
 *       name: time_start
 *       type: string
 *     - in: path
 *       name: time_end
 *       type: string
 *     - in: query
 *       name: time_period
 *       type: string
 *     - in: query
 *       name: interval
 *       type: string
 *     responses:
 *       200:
 *         description:
 */

router.route("/coin/:id/:time_start/:time_end").get(addArt);

export default router;
