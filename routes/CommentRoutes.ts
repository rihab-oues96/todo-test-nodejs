import { protect } from "../controllers/AuthController";
import { getAllComments } from "../controllers/CommentController";

const express = require("express");

const router = express.Router();

router.use(protect);

router.use("/", getAllComments);

module.exports = router;
