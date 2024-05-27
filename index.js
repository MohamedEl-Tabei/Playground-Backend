const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const DBCONNECTIONSTRING = process.env.DBCONNECTIONSTRING;

app.listen(PORT, async () => {
  await mongoose.connect(DBCONNECTIONSTRING);
  console.log(PORT);
});
