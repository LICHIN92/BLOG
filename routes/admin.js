const express=require('express');
const admin=express.Router();  //admin router
const admincontroll=require('../controllers/admincontroll'); //improting handler for admin route

admin.get('/',admincontroll);  

module.exports=admin;