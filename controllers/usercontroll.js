const mongoose=require('mongoose')
const USER=require("../models/usermodel").users; //importing only that model named as 'users'
const loginpage=(req,res)=>{

    const img="/login/logo.png"
    res.render('login',{img})
}
const signup=(req,res)=>{
    res.render('signup.hbs')
}
const dosignup=(req,res)=>{
    console.log(req.body);
    USER({name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).save()
    .then((resp)=>{
        res.json({signup:true})
    }).catch(()=>{
    res.json({signup:false})

    })
}

module.exports={loginpage,signup,dosignup};
