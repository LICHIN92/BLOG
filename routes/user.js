const exprss=require("express");
const user=exprss.Router();   //user router
const {loginpage,signup,dosignup,dologin,homepage}=require('../controllers/usercontroll')

user.get('/',loginpage)
user.get('/signup',signup)
user.post('/register',dosignup)
user.post('/login',dologin)
user.get("/home",homepage)
module.exports=user;