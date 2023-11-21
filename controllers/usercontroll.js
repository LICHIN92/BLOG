const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const USER=require("../models/usermodel").users; //importing only that model named as 'users'
const BLOGS=require("../models/blogermodel");
const { response } = require('express');
const loginpage=(req,res)=>{
    if(req.cookies.userJwt){
        res.redirect('/home')
    }else{
    const img="/user/login/logo.png"
    res.render('user/login',{img})
    }
}
const signup=(req,res)=>{
    res.render('user/signup.hbs')
}
const detail=(req,res)=>{
      res.render('user/detail')
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
const dologin=(req,res)=>{
    console.log(req.body);
    USER.find({email:req.body.email})
        .then((respo)=>{
        if(respo.length>0){
            // res.json({login:true})
            // console.log("email is ok");
            console.log(respo[0].name);//print the document if its found
            USER.find({email:req.body.email,password:req.body.password})
                .then((respa)=>{
                    if(respa.length>0){
                        console.log(respa)
                        const token=jwt.sign({userID:respa[0]._id},"secretkey",{expiresIn:'2d'})
                        res.cookie('userJwt',token,{
                            httpOnly:true,
                            sameSite:'lax',
                            secure:false,
                            maxAge:24*60*60*1000
                        })
                        res.json({login:1})
                    }else{
                        res.json({login:2})
                        console.log("password is wrong");
                    } 
                })
        }else{
            res.json({login:false})
            console.log("Email is not registered");
        }
          })
}
const homepage=(req,res)=>{
    BLOGS.find().then((response)=>{
        // console.log(response);//console the response that contain all the document in the bloger colletion
        res.render('user/home.hbs',{data:response})
    })
}
const logout=(req,res)=>{
      res.cookie("userJwt",null,{
        httpOnly:true,
        sameSite:'lax',
        secure:false,
        maxAge:0
      }) 
      req.cookies.userJwt=null;//clear userJwt cookie
    //   res.clearCookie("userJwt"); //another method of clearing userJwt cookie
      res.redirect('/')
}

module.exports={loginpage,signup,dosignup,dologin,homepage,detail,logout};
