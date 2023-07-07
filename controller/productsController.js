const Products = require("../model/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.json(product);
  } catch (error) {
    throw new Error();
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const query = { ...req.query };
    const excludes = ["page", "sort", "limit", "fields", "search"];
    excludes.forEach((field) => delete query[field]);
    const searchQuery = req.query.search;

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    let products = await Products.find(query).skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    throw new Error();
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const product = await Products.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const product = await Products.findByIdAndDelete(id);
    res.json(product);
  } catch (error) {
    throw new Error();
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error();
  }
});

const rateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { star, comment } = req.body;
  const product = await Products.findById(id);
  let alreadyRate = product?.ratings?.find(
    (rating) => rating.postBy.toString() === _id.toString()
  );

  if (alreadyRate) {
    await Products.findByIdAndUpdate(
      { ratings: { $elemMatch: alreadyRate } },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    await Products.findByIdAndUpdate(
      id,
      {
        $push: {
          ratings: {
            star,
            comment,
            postBy: _id,
          },
        },
      },
      { new: true }
    );
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const product = await Products.findById(id);
    const productDelete = product?.ratings?.filter(
      (product) => product.postBy.toString() !== _id.toString()
    );
    product.ratings = productDelete;
    product.save();
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadCoverImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const file = await uploader(req.file.path);
    const product = await Products.findByIdAndUpdate(id, {
      coverImange: file.url,
    });
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByIdAndUpdate(id, {
      ebook: req.file.filename,
    });
    res.json(product)
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  rateProduct,
  deleteComment,
  uploadCoverImage,
  uploadEbook,
};
