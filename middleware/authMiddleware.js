const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authentication = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifyToken.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, please try again");
    }
  } else {
    throw new Error("There is no token attached headers");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const {_id} = req.user
  const user = await User.findById(_id)
  if(user.role !== "admin") throw new Error("Not allow")
  else next();
})



module.exports = { authentication,isAdmin };
