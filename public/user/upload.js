function showimages(){
    const imageInput=document.getElementById('imageInput'); //image input  field element is target in imageInput const
    const imagePreview=document.getElementById("imagePreview");
    imagePreview.innerHTML=null;
    const selectedImage=imageInput.files;
    for(let i=0;i<selectedImage.length;i++){
       const image=document.createElement("img");
       image.src=URL.createObjectURL(selectedImage[i]);
       image.style.width='100px';
       image.style.height='100px'
       image.style.margin='2px'
       imagePreview.appendChild(image)
    }
}
//element counting
document.getElementById("upload").addEventListener('click', function() {
     var parentElement = document.getElementById('imagePreview');
    var numberOfChildren = parentElement.childElementCount;
    console.log('Number of child elements:', numberOfChildren)
    if(numberOfChildren>4){
        alert("try to upload less than 5")
    }
})

//logout
function adminlogout(){
    localStorage.clear;
    sessionStorage.clear;
    location.assign("/admin/logout")
}
