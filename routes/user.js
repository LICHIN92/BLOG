const exprss=require("express");
const user=exprss.Router();   //user router
const {loginpage,signup,dosignup,dologin,homepage,detail,logout}=require('../controllers/usercontroll')
const userAuth=require('../middleware/userAuthentication')

user.get('/',loginpage)
user.get('/signup',signup)
user.post('/register',dosignup)
user.post('/login',dologin)
user.get("/home",userAuth,homepage)
user.get('/detailedView',userAuth,detail)
user.get('/logout',logout)
module.exports=user;