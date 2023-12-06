function deletepost(postId){
    console.log(postId);
 fetch("/admin/delete",{
    method:'delete',
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({ postId: postId })
    })
}