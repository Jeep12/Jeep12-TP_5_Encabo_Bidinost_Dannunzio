import { checkPassword } from './formRegister.js';




document.addEventListener('DOMContentLoaded', () => {
   
    let inputPassword = document.getElementById("password");
    if (inputPassword) {
        checkPassword();
    }
});