function toastAlert(text) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/Jeep12/Jeep12-TP_5_Encabo_Bidinost_Dannunzio",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            fontSize: "15px",
            backgroundImage: "linear-gradient(to right top, #c49f58, #d19f48, #de9e37, #ed9d24, #fc9a03)"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

$('.slider').slick({
    autoplay:true,
    dots: false,
    fade: true,
    speed: 2000,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100
  })