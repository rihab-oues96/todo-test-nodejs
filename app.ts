const express = require("express");
const UserRouter = require("./routes/UserRoutes");
const TaskRouter = require("./routes/TaskRoutes");
const app = express();

app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks", TaskRouter);

export default app;
