const exprss=require("express");
const user=exprss.Router();   //user router
const {loginpage,signup,dosignup}=require('../controllers/usercontroll')

user.get('/',loginpage)
user.get('/signup',signup)
user.post('/register',dosignup)
module.exports=user;