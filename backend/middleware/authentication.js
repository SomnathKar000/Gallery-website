const jwt = require("jsonwebtoken");
const jwtSecret = "amisomnath";
const customError = require("../errors/error");

const authentication = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    throw new customError("Token does not exsist", 404);
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    throw new customError("Invalid token", 404);
  }
};
module.exports = authentication;
