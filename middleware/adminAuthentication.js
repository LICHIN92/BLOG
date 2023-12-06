const { response } = require("express");
const jwt=require("jsonwebtoken")
const ADMIN=require("../models/adminmodel").admins
const adminauth=(req,res,next)=>{
    if(req?.cookies?.AdminJwt){
        const admin=jwt.verify(req.cookies.AdminJwt,"adminkey")
        // console.log(admin);//admin will be an object
        if(admin){
            // console.log(admin.adminID);
            ADMIN.find({_id:admin.adminID},{password:0})//excluding admin password
              .then((response)=>{
                // console.log(response);//response contain array of object in which admin details except password of admin
                res.locals.adminDetails=response[0]
                next()
              })
            // next()
        }else{
            res.cookie('AdminJwt',null,{
                httpOnly:true,
                samesite:'lax',
                secure:false,
                maxAge:0
            })
            res.cookies.AdminJwt=null
            res.redirect('/admin')
        }
        
    }else{
        res.redirect('/admin')
    }
}
module.exports=adminauth