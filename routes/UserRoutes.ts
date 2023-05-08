import { Login, signUp, Logout } from "../controllers/AuthController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/UserController";

const express = require("express");

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", Login);

router.get("/logout", Logout);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
