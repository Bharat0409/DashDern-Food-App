import { Router } from "express";
import { orderData, myOrderData } from "../controllers/order.controller.js";

const router = Router()

router.route("/orderData").post(orderData)
router.route("/myOrderData").post(myOrderData)

export default router;