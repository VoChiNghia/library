const {client} = require('../config/redisConnect')
const asyncHandler = require("express-async-handler");

const catchMiddleware = asyncHandler(async (req, res, next) => {
    const {id} = req.params
   try {
    const myKeyValue = await client?.get(id);
    console.log(myKeyValue)
    if(myKeyValue){

        res.json(JSON.parse(myKeyValue))
    }else{
       next()
    }
   } catch (error) {
    throw new Error(error)
   }
}
)
module.exports = catchMiddleware