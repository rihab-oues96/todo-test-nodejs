const express = require("express");
const UserRouter = require("./routes/UserRoutes");
const TaskRouter = require("./routes/TaskRoutes");
const CommentRouter = require("./routes/CommentRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks", TaskRouter);
app.use("/api/v1/comments", CommentRouter);

export default app;
