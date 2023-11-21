function emailvalid(){
    let email=document.getElementById('email').value;
    let che=/^([a-z0-9/.]+)@([gmail]{5,5})\.([com]{3,3})$/i
    if(che.test(email)){
        console.log("email ok");
        return true;

    }else{
        console.log("email not ok");
        document.getElementById('email_valid').innerHTML='Please Enter Valid Email';
        document.getElementById("email_valid").style.color="red"
        return false;
    }
}
function namevalid(){
    let name=document.getElementById('name').value;
    let che=/^[a-z .]+$/i
    if(che.test(name)){
        console.log("name ok");
        return true;
    }else{
        console.log("name not ok");
       
        return false;
    }
}
function passwordvalid(){
    let pass=document.getElementById('password').value;
    let che=/^([a-z0-9]){8}$/i;
    if(che.test(pass)){
        console.log("pass true");
        return true;
       
    }else{
        console.log("pass not true");
        if(pass.length>8){
        document.getElementById("password_valid").innerHTML="Length must be 8";
        document.getElementById("password_valid").style.color="red"
        }
        return false;
    }
}  
function signin(){
    if(emailvalid() && namevalid() && passwordvalid()){
       console.log("all is well");
       let data={}
       data.name=document.getElementById('name').value;
       data.email=document.getElementById('email').value;
       data.password=document.getElementById('password').value;
       fetch("/admin/register",{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data),
    }).then((response)=>response.json())
    .then((data)=>{
        if(data.signin){
            console.log(data);
            console.log(data.signin);
            let inp=document.getElementsByTagName("input")
            inp[0].innerHTML='';
            inp[1].innerHTML=""
            inp[2].innerHTML=null
            alert("seccesfuly registered")
            window.location.href='/admin'
        }else{
            console.log(data);
            console.log(data.signin);
            document.getElementById('email_valid').innerHTML="This Email is Already registered"
            document.getElementById("email").style.outline="2px solid red"
            document.getElementById('email_valid').style.color="red"
            email=document.getElementById('email').value;
            alert(email+" is already exist")
        }
    })  
    }else{
        console.log("fool");
    }
}
function pass(){
    document.getElementById("password_valid").innerHTML="Only Letters and Numbers"
}
let events=document.getElementById("email");
events.addEventListener("keypress",key)
function key(){
    console.log("key press");
    document.getElementById('email_valid').innerHTML=""
    document.getElementById("email").style.outline="1px solid black"
}
events.addEventListener("focusout",focusout)
function focusout(){
    document.getElementById("email").style.outline="none"
}

let smallpass=document.getElementById("password")
smallpass.addEventListener('keydown',passworlength)
function passworlength(){
    document.getElementById("password_valid").innerHTML='Password Length must be 8'
}