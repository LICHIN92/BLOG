const jwt=require('jsonwebtoken')
const getUserData=require("../helper/helper")
const userAthentication=(req,res,next)=>{
    if(req?.cookies?.userJwt){
        const isLoggedin=jwt.verify(req.cookies.userJwt,process.env.Jwt_Key)
        if(isLoggedin){
            // console.log(isLoggedin);
            const user=parseJwt(req.cookies.userJwt)
            // console.log(user);//
            getUserData(isLoggedin.userID)
            .then((response)=>{
                            // console.log(response);//user details without password
                            res.locals.userDetail=response[0];
                            next()
                        })
            // next()

        }else{
            res.cookie("userJwt",null,{
                httpOnly:true,
                sameSite:'lax',
                secure:false,
                maxAge:0
              }) 
            req.cookies.userJwt=null; //for clear userJwt cookies
            //  res.clearCookie('userJwt') //another method to for clear userJwt cookies
             res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
}
// function for parsing userJwt cookies
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
module.exports=userAthentication