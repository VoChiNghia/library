const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const RequestBook = require("../model/requestBookModel");

const createRequestBook = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const newRequestBook = await RequestBook.create({ ...req.body, user: _id });
    res.json(newRequestBook);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRequestBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updateRequestBook = await RequestBook.findByIdAndDelete(id);
    res.json(updateRequestBook);
  } catch (error) {
    throw new Error(error);
  }
});

const getRequestBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getRequestBook = await RequestBook.findById(id).populate({
      path: "user",
      select: "-password -citizenNumber -role",
    });
    res.json(getRequestBook);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllRequestBook = asyncHandler(async (req, res) => {
  try {
    const getAllRequestBook = await RequestBook.find().populate({
      path: "user",
      select: "-password -citizenNumber -role",
    });
    res.json(getAllRequestBook);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createRequestBook,
  deleteRequestBook,
  getRequestBook,
  getAllRequestBook,
};
