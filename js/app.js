
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => {
    observer.observe(element);
});

//codigo para detectar si estan en pantalla, no logre hacerlo funcionar, mañana chequeo de nuevo