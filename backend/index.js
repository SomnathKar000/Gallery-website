require("dotenv").config();
require("express-async-errors");
const DBURL = process.env.DB_URL;
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
const ImageControlRoutes = require("./routes/uploadImage");
const errorMiddleware = require("./middleware/error-handler");
const notFoundmiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;
// middleware

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(
    express.static(path.resolve(path.dirname(__dirname), "frontend", "build"))
  );
  console.log(path.resolve(path.dirname(__dirname), "frontend", "build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(path.dirname(__dirname), "frontend", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.use("/api/v1", authRoutes);
app.use("/api/v1/images", ImageControlRoutes);
app.use(errorMiddleware);
app.use(notFoundmiddleware);

// Start the server
const start = async () => {
  try {
    await connectDB(DBURL);
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
