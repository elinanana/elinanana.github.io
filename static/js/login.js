import { fetchJWT } from "./jwt.js";

export function logIn(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    clearLoginErrors();
    isLoginValid() ? fetchJWT(email, password) : showLoginErrors();
}

function isLoginValid() {
    const loginForm = document.getElementById('logInForm');
    return loginForm.checkValidity()
}


function showLoginErrors() {
    const loginForm = document.getElementById("logInForm")
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    let err = '';

    if (loginForm[0].validity.valueMissing) {
        err = "Type in email or username";
        emailError.innerHTML = err;
    }

    if (loginForm[1].validity.valueMissing) {
        err = "Type in password";
        passwordError.innerHTML = err;
    }

}

export function clearLoginErrors() {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("jwtError").innerHTML = "";
}


