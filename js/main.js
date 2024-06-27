import { register } from './formRegister.js';
import './formLogin.js';

let session;

document.addEventListener('DOMContentLoaded', async () => {
    let inputPasswordRegister = document.getElementById("passwordSingUp");
    let name = document.getElementById("name");
    let lastName = document.getElementById("lastName");
    let emailRegister = document.getElementById("emailRegister");
    let confirmPasswordRegister = document.getElementById("repeatPasswordSingUp");

    if (inputPasswordRegister && name && lastName && emailRegister && confirmPasswordRegister) {
        register();
    }

    // Verificar si hay una sesión activa
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    session = currentUser ? true : false;

    // Ajustar visibilidad de los botones en wrapper-links
    let btnsSingUpSingIn = document.getElementById("wrapper-links");
    let panelUser = document.getElementById("panelUser");
    if (session) {
        console.log("Hay sesion");
        btnsSingUpSingIn.classList.add("deleteElement");
        panelUser.classList.add("addElement");
        //btnsSingUpSingIn.style.display="none !important";
        //panelUser.style.display="block !important";
    } else {
        console.log("no hay sesion");

        btnsSingUpSingIn.classList.remove("deleteElement");
        btnsSingUpSingIn.classList.add("addElement");

        panelUser.classList.add("deleteElement");
        panelUser.classList.remove("addElement");
       // btnsSingUpSingIn.style.display="block !important";
        //panelUser.style.display="none !important";
    }
});

document.getElementById("logout").addEventListener("click",logout);

function logout(){
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}


// Función para mostrar un mensaje de alerta usando Toastify
function toastAlert() {
    Toastify({
        text: "Texto copiado",
        duration: 3000,
        gravity: "top", // Posición del mensaje en la pantalla
        position: "right", // Posición del mensaje en la pantalla
        style: {
            fontSize: "15px",
            backgroundImage: "linear-gradient(to right top, red, red, red, red, red)" // Cambia el color de fondo para los mensajes de error
        },
        onClick: function () { } // Callback después del clic en el toast
    }).showToast();
}
