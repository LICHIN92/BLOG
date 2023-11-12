const express=require('express');
const admin=express.Router();  //admin router
const {adminlogin,admincontroll,adminsign,pageupload,createblog}=require('../controllers/admincontroll'); //improting handler for admin route

admin.get('/',adminlogin);

admin.get('/signin',admincontroll);  

admin.post('/register',adminsign)

admin.get("/upload",pageupload)

admin.post('/createblog',createblog)

module.exports=admin;