import express from "express";
const router = express.Router();
import {
  createPayment,
  successPayment,
} from "../controllers/payment/payment.js";
router.route("/createPayment").post(createPayment);
router.route("/successPayment").get(successPayment);
export default router;
