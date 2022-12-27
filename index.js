const express = require("express");
const app = express();
const user = require("./route/query");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1", user);

app.listen(process.env.PORT || 5001, "0.0.0.0", () => {
  console.log("Backend server is running!");
});
