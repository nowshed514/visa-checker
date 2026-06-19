const form =
document.getElementById("loginForm");

const error =
document.getElementById("error");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(
        username === "admin" &&
        password === "123456"
    ){

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        window.location.href =
        "index.html";

    }

    else{

        error.textContent =
        "Invalid Username or Password";

    }

});