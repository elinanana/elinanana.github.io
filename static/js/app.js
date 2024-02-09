import { logIn } from "./login.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const logInForm = document.getElementById('logInForm');
    logInForm.addEventListener('submit', logIn);
}