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