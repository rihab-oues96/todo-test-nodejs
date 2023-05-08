import app from "./app";
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connections successfuly"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
