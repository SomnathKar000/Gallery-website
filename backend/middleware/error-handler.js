const CustomError = require("../errors/error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res
    .status(500)
    .json({ success: false, msg: "Something went wrong try again later.." });
};

module.exports = errorHandler;
