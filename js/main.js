import './formRegister.js';
import './formLogin.js';


document.addEventListener('DOMContentLoaded', async () => {
    let session = null;


    // Verifica si hay una sesión activa con localStorage
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    session = currentUser ? true : false;

    // Ajustar visibilidad de los botones  registrarse e ingresar
    let btnsSingUpSingIn = document.getElementById("wrapper-links");
    let panelUser = document.getElementById("panelUser");
    if (session) {

        btnsSingUpSingIn.classList.add("deleteElement");
        panelUser.classList.add("addElement");

    } else {

        btnsSingUpSingIn.classList.remove("deleteElement");
        btnsSingUpSingIn.classList.add("addElement");

        panelUser.classList.add("deleteElement");
        panelUser.classList.remove("addElement");

    }


    //borra el item del localStorage
    document.getElementById("logout").addEventListener("click", logout);

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }


});



$('.slider1').slick({
    draggable: true,
    arrows: true,
    dots: false,
    fade: true,
    speed: 4000,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    autoplay: true
})

//OBJETOS A LOS QUE SE LE APLICA LA ANIMACION 
//CUANDO SE DISPARA EL OBSERVER DEL
const article2 = document.querySelector("#article-2");

const art2Right = document.querySelector(".art2Right");
const titleArt2 = document.querySelector("#titleArt2");
const parrafosArt2 = document.querySelectorAll(".animationLeft");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target === article2) {

                art2Right.classList.add("slide-in-right");
                titleArt2.classList.add("slide-in-left");
                for (let i = 0; i < parrafosArt2.length; i++) {
                    parrafosArt2[i].classList.add("slide-in-left");
                }
            }
        }
    });
});

observer.observe(article2);




$('.slider2').slick({
    autoplay: true,

})