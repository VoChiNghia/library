const generateToken = require("../config/jwt");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { client } = require("../config/redisConnect");
const crypto = require("node:crypto");
const Token = require("../model/tokenModel");

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
}

const createUser = asyncHandler(async (req, res) => {
  const { studentCode } = req.body;
  const user = await User.findOne({ studentCode: studentCode });
  if (!user) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  } else res.json("user exist");
});

const login = asyncHandler(async (req, res) => {
  const { studentCode, password } = req.body;
  try {
    const user = await User.findOne({ studentCode: studentCode });
    if (user && (await user.isPasswordMatched(password))) {
      const { publicKey, privateKey } = generateKeyPair();
      const token = generateToken(user._id, publicKey, privateKey);
      await Token.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          publicKey,
          privateKey,
        },
        { upsert: true, new: true }
      );
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        studentCode: user.studentCode,
        role: user.role,
        token: token.token,
        refeshToken: token.refeshToken,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Email Không tìm thấy");
  if (user && (await user.isPasswordMatched(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Mật khẩu không chính xác");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    await client.set(id, value);
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findById(id);
    const value = JSON.stringify(user);
    await client.set(id, value);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

const changePassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(_id);
  try {
    if (user && (await user.isPasswordMatched(currentPassword))) {
      user.password = newPassword;
      const updatepassword = await user.save();
      res.json(updatepassword);
    } else {
      throw new Error("password is not matched");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  changePassword,
  loginAdmin,
};
