const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const FavoriteBook = require("../model/favoriteModel");

const addFavoriteBook = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const findListFavorite = await FavoriteBook.findOne({ user: _id });

    if (findListFavorite.length === 0) {
      const newList = await FavoriteBook.create({
        user: _id,
        listBooks: [prodId],
      });
      res.json(newList);
    } else {

      const index = FavoriteBook?.find({ user: _id }).listBooks?.indexOf(prodId);
      if (index === -1) {
        // If productId is not found, add it to the listBooks array
        findListFavorite.listBooks.push(prodId);
        res.json('added')
      } else {
        // If productId already exists, override the existing value
        findListFavorite.listBooks[index] = prodId;
        res.json('added')
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getListFavoriteByUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const getByUser = await FavoriteBook.findOne({user:id})
        res.json(getByUser)
    } catch (error) {
        throw new Error(error);
    }
})

const getListFavorite = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const getByUser = await FavoriteBook.findById(id)
        res.json(getByUser)
    } catch (error) {
        throw new Error(error);
    }
})


const getAllListFavorite = asyncHandler(async (req, res) => {
    try {
        const getAllListFavorite = await FavoriteBook.find()
        res.json(getAllListFavorite)
    } catch (error) {
        throw new Error(error);
    }
})

const deleteListFavoriteByUser = asyncHandler(async (req,res) => {
    const {id} = req.params
    try {
        const deleteListFavoriteByUser = await FavoriteBook.findOneAndDelete({user: id})
        res.json(deleteListFavoriteByUser)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { addFavoriteBook,getListFavoriteByUser,getAllListFavorite,deleteListFavoriteByUser,getListFavorite };


