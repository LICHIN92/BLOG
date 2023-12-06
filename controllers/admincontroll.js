const mongoose=require("mongoose")
const multer=require('multer')
const ADMIN=require('../models/adminmodel').admins
const BLOGS=require("../models/blogermodel")
const jwt=require("jsonwebtoken")

const adminlogin=(req,res)=>{
    if(req.cookies.AdminJwt){
        res.redirect('/admin/upload')
    }else{
        res.render('admin/login.hbs')
    }
}
const  admincontroll=(req,res)=>{
    res.render('admin/signin')
}
const adminsign=(req,res)=>{
    // console.log(req.body);
    ADMIN.find({email:req.body.email})
      .then((response)=>{
        if(response.length ==0 ){
            ADMIN({name:req.body.name,
                email:req.body.email,
                password:req.body.password
                }).save()
                .then((resp)=>{
                    res.send({signin:true})
                })
        }else{
            console.log('exist');
            res.send({signin:false})
        }
    })
}
const pageupload=(req,res)=>{
    res.render('admin/uploadpage.hbs')
}
const login=(req,res)=>{
    console.log(req.body);
    ADMIN.find({email:req.body.email})
        .then((resp)=>{
            // console.log(resp);
            if(resp.length>0){
              ADMIN.find({email:req.body.email,password:req.body.password})
                    .then((respo)=>{
                        if(respo.length>0){
                            console.log(respo);
                            const adminToken=jwt.sign({adminID:respo[0]._id},"adminkey",{expiresIn:"2d"})
                            res.cookie('AdminJwt',adminToken,{
                                httpOnly:true,
                                samesite:'lax',
                                secure:false,
                                maxAge:24*60*60*1000
                            })
                            console.log('email and  password are correct');
                            res.json({login:2})
                        }else{
                            console.log("password is wrong");
                            res.json({login:1})
                        }
                    })
            }else{
                console.log('email is not registered');
                res.json({login:0})
            }
        })
}
const  createblog=(req,res)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,files,cb)=>{
            cb(null,"public/uploads");
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now()+'-'+files.originalname)
        }
    })
    const upload=multer({storage:fileStorage}).array("images",4)
   
    upload(req,res,(err)=>{
        if(err){
        console.log('nothing');
        // res.send()
        }else{
            BLOGS({title:req.body.title,
                content:req.body.content,
                images:req.files}).save()
                .then((respo)=>{
                 res.redirect("/admin/upload")
                
                })
            console.log(req.files);//print the uploaded files detailes
            // console.log(req.body);

        }  
    })
}
const home=(req,res)=>{
    BLOGS.find().then((blogdata)=>{
        res.render('admin/home',{data:blogdata}) 

    })
}
const deletepost=(req,res)=>{
    console.log(req.body.postId);
    // BLOGS.find({_id:req.body.postId}).then((data)=>{
    //     console.log(data);
    // })
    BLOGS.findOneAndDelete({_id:req.body.postId}).then(dd=>{
        console.log(dd);
    })
     
}
const logout=(req,res)=>{
    res.cookie('AdminJwt',null,{
        httpOnly:true,
        samesite:'lax',
        secure:false,
        maxAge:0
    })
    // req.cookies.AdminJwt=null;
    res.clearCookie('AdminJwt')
    res.redirect('/admin')
}

module.exports={adminlogin,admincontroll,adminsign,pageupload,createblog,login,home,deletepost,logout};