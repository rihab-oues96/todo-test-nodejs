import { protect } from "../controllers/AuthController";
import {
  commentTask,
  createTask,
  deleteTask,
  getAllTasksByMe,
  getTask,
  getTasksSharedToMe,
  shareMyTask,
  updateTask,
} from "../controllers/TaskController";

const express = require("express");

const router = express.Router();

router.use(protect);

router.route("/").post(createTask).get(getAllTasksByMe);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

router.route("/:id/share").patch(shareMyTask);

router.route("/shared/me").get(getTasksSharedToMe);

router.route("/:id/comment").put(commentTask);

module.exports = router;
