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
                        res.json({login:1})
                        console.log(respa)
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
    // console.log("homaepage");
    res.render('home.hbs')
}
module.exports={loginpage,signup,dosignup,dologin,homepage};
