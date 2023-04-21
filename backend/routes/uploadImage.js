const {
  deleteImages,
  updateImages,
  createImage,
  fetchAllImages,
} = require("../controllers/uploadImageController");

const express = require("express");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.route("/").post(authentication, fetchAllImages);
router.route("/create-image").post(authentication, createImage);
router.route("/updatae-image/:id").patch(authentication, updateImages);
router.route("/delete-images/:id").patch(authentication, deleteImages);

module.exports = router;
