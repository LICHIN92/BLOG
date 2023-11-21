function emailvalid(){
    let email=document.getElementById("email").value;
    console.log(email);
    let c=/^([a-z0-9-_\.]+)@([a-z0-9]{2,20})\.([a-z]{3,6})$/i;
    // console.log(c.test(email));
    if(c.test(email)){
        // console.log("valid");
        // document.getElementById("p1").innerHTML="valid"
        return true;
    }else{
        // console.log("not valid");
        document.getElementById("p1").innerHTML="enter a valid email"
        return false;
    }
}
function login(){
    emailvalid()
    if(emailvalid()){
        let logindata={}
        logindata.email=document.getElementById("email").value;
        logindata.password=document.getElementById("password").value;
        fetch("/login",{
            method:"post",
            headers:{
                "Content-type":"application/json",
                // "Accept":"application/json"
            },body:JSON.stringify(logindata)
        }).then((response)=>response.json())
        .then((res)=>{
            if(res.login===1){
                console.log(res);
                window.location.href='/home'
            }else if(res.login===2){
                console.log(res);
                document.getElementById("p2").innerHTML="Wrong Password"
                alert("password is wrong")
            }else{
                document.getElementById("p1").innerHTML="Email is not registered";
                alert(logindata.email+" is not registered")
            }
        })
        
    }else{
        return false;
    }
}
