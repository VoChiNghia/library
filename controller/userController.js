const generateToken = require('../config/jwt')
const User = require('../model/userModel')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');
const redis = require("redis");
const {client} = require('../config/redisConnect')
const createUser = asyncHandler(async (req, res) => {
    const {studentCode} = req.body
    const user = await User.findOne({studentCode:studentCode})
    if(!user){
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (error) {
            throw new Error(error)
        }
    }else res.json('user exist')
   
})

const login = asyncHandler(async (req, res) => {
    const {studentCode,password} = req.body
    const user = await User.findOne({studentCode:studentCode})
    if(user && await user.isPasswordMatched(password)){
        res.json({
            id: user.id,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            studentCode:user.studentCode,
            role:user.role,
            token:generateToken(user._id)
        })
    }else {
        throw new Error('invalid')
    }

})

const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user
    validateMongoDbId(_id)
   try {
    const updateUser = await User.findByIdAndUpdate(_id,req.body,{new:true})
    await client.set(id, value);
    client.quit();
    res.json(updateUser)
   } catch (error) {
    throw new Error(error)
   }   
})

const getUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
   try {
    const user = await User.findById(id)
    const value = JSON.stringify(user);
    await client.set(id, value);
    client.quit();
    res.json(user)
   } catch (error) {
    throw new Error(error)
   }   
})

const getAllUser = asyncHandler(async (req, res) => {
   try {
    const user = await User.find()
    res.json(user)
   } catch (error) {
    throw new Error(error)
   }   
})

const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
   try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.json(deleteUser)
   } catch (error) {
    throw new Error(error)
   }   
})

const changePassword = asyncHandler(async (req, res, next) => {
    const {_id} = req.user
    const {currentPassword,newPassword} = req.body
    const user = await User.findById(_id)
    try {
      if(user && await user.isPasswordMatched(currentPassword)) {
        user.password = newPassword
        const updatepassword = await user.save()
        res.json(updatepassword)
      }else{
       throw new Error('password is not matched')
      }
    } catch (error) {
      throw new Error(error)
    }
  })

module.exports = {createUser,login,getUser,getAllUser,updateUser,deleteUser,changePassword}