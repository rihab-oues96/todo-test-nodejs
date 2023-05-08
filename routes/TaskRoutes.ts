import { protect } from "../controllers/AuthController";
import { createCommentOnTask } from "../controllers/CommentController";
import {
  createTask,
  deleteTask,
  getAllTasksByMe,
  getTask,
  getTasksSharedToMe,
  setTasksUsersIds,
  shareMyTask,
  updateTask,
} from "../controllers/TaskController";

const express = require("express");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").post(setTasksUsersIds, createTask).get(getAllTasksByMe);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

router.route("/:id/share").patch(shareMyTask);

router.route("/shared/me").get(getTasksSharedToMe);

router.route("/:id/comment").put(createCommentOnTask);

module.exports = router;
