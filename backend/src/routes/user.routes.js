import { Router } from "express";
import {
    registerUser,
    loginUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/createuser").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/logout").post(verifyJWT, logoutUser)

export default router