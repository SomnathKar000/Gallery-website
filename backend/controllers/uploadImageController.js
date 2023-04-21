const Image = require("../models/imagesModel");
const customError = require("../errors/error");

const fetchAllImages = async (req, res) => {
  try {
    const id = req.user.id;
    const images = await Image.find({ userId: id }).exec();
    let base64Strings = images.map(({ data, name, _id }) => {
      const image = data?.toString("base64");
      return { image, name, _id };
    });
    base64Strings = base64Strings.reverse();
    res.status(200).json({
      success: true,
      msg: "fetch all images",
      images: base64Strings,
    });
  } catch (err) {
    console.log(err);
  }
};
const createImage = async (req, res) => {
  try {
    const { title, image } = req.body;
    const buffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const imageData = await Image.create({
      name: title,
      data: buffer,
      userId: req.user.id,
    });
    const NewImage = {
      _id: imageData._id,
      title: title,
      image: image,
    };
    res
      .status(200)
      .json({ success: true, msg: "Image uploaded successfully", NewImage });
  } catch (err) {
    console.log(err);
    throw new customError("Interna server err", 400);
  }
};

const updateImages = async (req, res) => {
  const _id = req.params.id;
  const userId = req.user.id;
  const name = req.body.title;
  const image = await Image.findOne({ _id, userId });
  if (!image) {
    throw new customError("Image can not found", 404);
  }
  await Image.updateOne({ _id, userId }, { name });
  res.status(200).json({ success: true, msg: "Image updated successfully" });
};
const deleteImages = async (req, res) => {
  const userId = req.user.id;
  const _id = req.params.id;
  const image = await Image.findOne({ _id, userId });
  if (!image) {
    throw new customError("Image does not exsist1", 404);
  }
  await Image.deleteOne({ _id, userId });
  res.status(200).json({ success: true, msg: "Image deleted successfully" });
};

module.exports = { deleteImages, updateImages, createImage, fetchAllImages };
