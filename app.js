require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(morgan("tiny"));

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


//export express API
module.exports = app;