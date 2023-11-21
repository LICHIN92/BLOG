function logout(){
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/logout')
}