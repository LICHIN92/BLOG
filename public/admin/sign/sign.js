function emailvalid(){
    let email=document.getElementById('email').value;
    let che=/^([a-z0-9/.]+)@([a-z0-9]{2,16})\.([a-z]{3,6})$/i
    if(che.test(email)){
        console.log("email ok");
        return true;

    }else{
        console.log("email not ok");
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
        
        return false;
    }
}  
function signin(){
    // emailvalid()
    // namevalid()
    // passwordvalid()
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
            window.location.href='/admin'
        }else{
            console.log(data);
            console.log(data.signin);
            document.getElementById('email-valid').innerHTML="this Email is Exist"
            document.getElementById("email").style.outline="2px solid blue"
            email=document.getElementById('email').value;
            alert(email+" is already exist")
        }
    })  
    }else{
        console.log("fool");
    }
}
