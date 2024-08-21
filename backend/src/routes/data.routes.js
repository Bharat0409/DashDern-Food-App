import { Router } from "express";
import {
    data
} from "../controllers/data.controller.js";

const router = Router()

router.route("/foodData").post(data)

export default router;
