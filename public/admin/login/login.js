console.log("hello");
function emailvalid(){
    let email=document.getElementById("email").value;
    let che=/^([a-z0-9]+)@([a-z]{5,12})\.([a-z]{3,12})$/i
    if(che.test(email)){
        return true;
    }else{
        return false;
    }
}  
function passwordvalid(){
    let password=document.getElementById("password").value;
    if(password.length>0){
        return true;
    }else{
        return false;
    }
}
function adminlogin(){
    if(emailvalid() && passwordvalid()){    
        let logindata={}
        logindata.email=document.getElementById("email").value;
        logindata.password=document.getElementById("password").value;
        fetch("/admin/login",{
                        method:"post",
                        headers:{
                        "content-type":"application/json"
                        },body:JSON.stringify(logindata)
                    }).then((response)=>response.json())
                    .then((res)=>{
                        if(res.login===0){
                           document.getElementById("emailvalid").innerHTML="This Email is not registered"
                        }else if(res.login===1){
                           document.getElementById("passwordvalid").innerHTML="Wrong Password"

                        }else{
                            window.location.href="/admin/upload"
                        }
                    })               
    }else{
        console.log('ok');
    }
}