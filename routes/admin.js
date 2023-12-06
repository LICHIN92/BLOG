const express=require('express');
const admin=express.Router();  //admin router
const {adminlogin,admincontroll,adminsign,pageupload,createblog,login,home,deletepost,logout}=require('../controllers/admincontroll'); //improting handler for admin route
const adminauth=require('../middleware/adminAuthentication')

admin.get('/',adminlogin);

admin.get('/signin',admincontroll);  

admin.post('/register',adminsign)

admin.get("/upload",adminauth,pageupload)

admin.post('/createblog',adminauth,createblog)

admin.post("/login",login)

admin.get("/home",adminauth,home)

admin.delete("/delete",deletepost)

admin.get("/logout",logout)

module.exports=admin;