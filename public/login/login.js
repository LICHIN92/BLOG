function emailvalid(){
    let email=document.getElementById("email").value;
    console.log(email);
    let c=/^([a-z0-9-_\.]+)@([a-z0-9]{2,20})\.([a-z]{2,6})$/i;
    console.log(c.test(email));
    if(c.test(email)){
        console.log("valid");
        document.getElementById("p1").innerHTML="valid"
        return true;
    }else{
        console.log("not valid");
        document.getElementById("p1").innerHTML="**not valid*"
        return false;
    }
}
function login(){
    emailvalid()
    if(emailvalid()){
        return true
    }else{
        return false;
    }
}
