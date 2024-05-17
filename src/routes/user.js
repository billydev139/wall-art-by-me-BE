import express from "express";
const router = express.Router();
import { placeOrder } from "../controllers/user/user.js";


router.route("/placeOrder").post(placeOrder);
export default router;