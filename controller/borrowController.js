const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const User = require("../model/userModel");
const Borrow = require("../model/borrowModel");

const createTicket = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const ticket = await Borrow.create({ ...req.body, user: _id });
    const user = await User.findById(_id);
    user.borrowBook = ticket._id;
    await user.save();
    res.json(ticket);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTicket = asyncHandler(async (req, res) => {
  try {
    const allTickets = await Borrow.find().populate("prodId").populate({
      path: "user",
      select: "-password -citizenNumber -role",
    });
    res.json(allTickets);
  } catch (error) {
    throw new Error(error);
  }
});

const getTicket = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
      const allTickets = await Borrow.findById(id).populate("prodId").populate({
        path: "user",
        select: "-password -citizenNumber -role",
      });
      res.json(allTickets);
    } catch (error) {
      throw new Error(error);
    }
  });

  const deleteTicket = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {_id} = req.user
    try {
      const ticket = await Borrow.findByIdAndDelete(id)
      const user = await User.findByIdAndUpdate(_id,{
        $pull: {borrowBook:id}
      });
      res.json(ticket);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateTicket = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {_id} = req.user
    try {
        const {status, ...other} = req.body
      const ticket = await Borrow.findByIdAndUpdate(id,other)
      res.json(ticket);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createTicket, getAllTicket,getTicket,deleteTicket,updateTicket };
