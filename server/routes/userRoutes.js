import {
  registerController,
  loginController,
  setAvatarController,
  allUsersController,
} from "../controllers/usersController.js";

import express from "express";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/setAvatar/:id", setAvatarController);

router.get("/allusers/:id", allUsersController);

export default router;
