const mongoose=require('mongoose')
const USER=require('../models/usermodel').users

const getUserData=(userID)=>{
   return USER.find({_id:userID},{password:0})
}
module.exports=getUserData