import {
  registerController,
  loginController,
} from "../controllers/usersController.js";

import express from "express";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
