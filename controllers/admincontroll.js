const mongoose=require("mongoose")
const multer=require('multer')
const ADMIN=require('../models/adminmodel').admins

const adminlogin=(req,res)=>{
    res.render('admin/login.hbs')
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
            console.log(response)
            res.send({signin:false})
        }
    })
}
const pageupload=(req,res)=>{
    res.render('admin/uploadpage.hbs')
}

const createblog=(req,res)=>{
    console.log(req.body);
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
      
        }else{
            console.log(req.files);
        }  
    })
}

module.exports={adminlogin,admincontroll,adminsign,pageupload,createblog};