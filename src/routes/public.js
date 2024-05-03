import express from "express";
const router = express.Router();
import {
  hitApi,
} from "../controllers/public/public.js";

/**
 *  @swagger
 *  tags:
 *    name: Public
 */

// /**
//  * @swagger
//  * /public/coin/{symbol}/{time_start}/{time_end}:
//  *   get:
//  *     summary:
//  *     tags: [Public]
//  *     parameters:
//  *     - in: path
//  *       name: symbol
//  *       type: string
//  *     - in: path
//  *       name: time_start
//  *       type: string
//  *     - in: path
//  *       name: time_end
//  *       type: string
//  *     - in: query
//  *       name: time_period
//  *       type: string
//  *     - in: query
//  *       name: interval
//  *       type: string
//  *     responses:
//  *       200:
//  *         description:
//  */

router.route("/coin/:id/:time_start/:time_end").get(hitApi);

export default router;