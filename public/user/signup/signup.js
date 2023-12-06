function emailvalid(){
    let email=document.getElementById('email').value;
    let che=/^([a-z0-9/.]+)@([a-z0-9]{2,16})\.([a-z]{3,6})$/i
    // console.log(che.test(email));
    if(che.test(email)){
        // console.log('mail ok');
        return true;
    }else{
        document.getElementById('emailvalid').innerHTML="*not valid*"
        document.getElementById('emailvalid').style.color="red";
        // document.getElementById('email').style.outline="1px solid red";
        return false;
    }
}
function namevalid(){
    let name=document.getElementById('name').value;
    let che=/^[a-z .]+$/i
    // console.log(che.test(name));
    if(che.test(name)){
        document.getElementById('name').style.textTransform="uppercase"
        // console.log("name ok");
        return true;
    }else{
        document.getElementById('namevalid').innerHTML="*not valid*"
        document.getElementById('namevalid').style.color="red";
        // document.getElementById('name').style.outline="1px solid red";
        return false;
    }
}
function passwordvalid(){
    document.getElementById('passvalid').innerHTML="";
    let pass=document.getElementById('password').value;
    let che=/^([a-z0-9]){8}$/i;
    if(che.test(pass)){
        // console.log("pass true");
        document.getElementById('passvalid').innerText="";
        // console.log(pass);
        return true
    }else{
        document.getElementById('passvalid').innerText="*maximum length 8*";
        document.getElementById('passvalid').style.color="red";
        return false;
    }
}
function numbervalid(){
    let mobile=document.getElementById('mobile').value;
    let che=/^[0-9]{10}$/
    if(che.test(mobile)){
        console.log('ok');
        return true;
    }else{
        console.log("f");
        document.getElementById('mobilevalid').innerHTML="please enter mobile";
        document.getElementById('mobilevalid').style.color="red"
        return false;
    }

}
function gender(){
    var selectedGender = document.querySelector('input[name="GENDER"]:checked');
            if (selectedGender) {
            var genderValue = selectedGender.value;
             if(genderValue){
                console.log("Selected gender:", genderValue);
                return true;
             }else{
                document.getElementById("gensmall").value="select Gender";
                return false;
             }
           
            } else {
            console.log("No gender selected");
            document.getElementById("gensmall").innerHTML=" ** select Gender";
            document.getElementById("gensmall").style.color="red";
            return false;           
            }
}

document.getElementById("password").addEventListener("focus",inform)
function inform(){
    document.getElementById('passvalid').innerHTML="alphanumeric characters";
    document.getElementById('passvalid').style.color="white"
}
document.getElementById("password").addEventListener("focusout",passwordvalid)

function submit(){
    
    namevalid()
    emailvalid()
    passwordvalid()
    numbervalid()
    gender()
    if(emailvalid() && namevalid() && passwordvalid() && numbervalid() && gender()){
        console.log("all true");
        //taking values from radio button
            var selectedGender = document.querySelector('input[name="GENDER"]:checked');
            if (selectedGender) {
            var genderValue = selectedGender.value;
            console.log("Selected gender:", genderValue);
            } else {
            console.log("No gender selected");
            }

        let formdata={}
        formdata.name=document.getElementById('name').value;
        formdata.email=document.getElementById('email').value;
        formdata.password=document.getElementById('password').value;
        formdata.mobile=document.getElementById("mobile").value;
        formdata.gender=genderValue;
        console.log(formdata);
        // return true;  

    fetch("/register",{
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(formdata),
    }).then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        console.log(data.signup);
        if(data.signup){
                 // Select all radio buttons in the group named "GENDER"
var allGenderRadios = document.querySelectorAll('input[name="GENDER"]');

// Filter out the checked radio button (if any)
var uncheckedGenderRadios = Array.from(allGenderRadios).filter(radio => !radio.checked);

            let input=document.getElementsByTagName("input")
            input[0].innerHTML='';
            input[1].innerHTML='';
            document.getElementById("mobile").innerHTML="";
            document.getElementById("password").innerText="";
            alert("successfully registered")    
            window.location.href='/'
        }else{
            alert(document.getElementById('email').value+" already has an account");
        }
    })
    }
    else{
        console.log("fool");
        return false;
    }
}