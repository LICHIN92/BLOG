const express=require('express')
const app=new express();
const path=require('path')
const hbs=require("hbs")
const user=require('./routes/user');
const admin=require('./routes/admin');
const connectDB=require('./config/dbconfig');
connectDB();

require('dotenv').config()
const cookieparser=require('cookie-parser')

app.set('view engine',"hbs")
app.set('views',path.join(__dirname,'pages'))

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieparser())

app.use('/',(req,res,next)=>{
        res.set('cache-control','no-store')
        next()
})
app.use('/',user)

// app.use('/admin',(req,res,next)=>{
//         res.set('cache-control','no-store')
//         next()   
// })
app.use('/admin',admin)

app.listen(process.env.PORT,()=>{
        console.log("running");
})