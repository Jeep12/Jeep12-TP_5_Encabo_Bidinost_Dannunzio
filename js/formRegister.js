


document.addEventListener('DOMContentLoaded', function () {


    const validColor = "green";
    const invalidColor = "gray";
    const validBackground = "white";
    const invalidBackground = "#ccc";
    const borderWidth = "1px";

    // inputs por id
    let name = document.getElementById("name");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("emailRegister");
    let passwordRegister = document.getElementById("passwordSingUp");
    let confirmPasswordRegister = document.getElementById("repeatPasswordSingUp");
    let passwordValue;
    //Iconos candados
    let icons = document.querySelectorAll(".iconLock");

    function checkPasswordMatch(){
        let confirmPassword = confirmPasswordRegister.value;
        let iconPasswordMatch = document.getElementById("iconPasswordMatch");
        const passwordMatchText = document.querySelector('#passwordMatchText');

        if (confirmPassword == passwordValue) {
            updateIconStyle(borderWidth, iconPasswordMatch, validColor, validBackground);
            passwordMatchText.innerHTML = "Las contraseñas coinciden";
            iconPasswordMatch.classList.add("fa-check");
            iconPasswordMatch.classList.remove("fa-times");
        } else {
            updateIconStyle(borderWidth, iconPasswordMatch, invalidColor, invalidBackground);
            passwordMatchText.innerHTML = "Las contraseñas no coinciden";
            iconPasswordMatch.classList.remove("fa-check");
            iconPasswordMatch.classList.add("fa-times");
        }

    }
    if (confirmPasswordRegister) {

        confirmPasswordRegister.addEventListener("input", checkPasswordMatch);
    }
    //levanto form con FormData

    const form = document.getElementById('formRegister');
    if (form) {


        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            const formData = new FormData(form);

            const name = formData.get('name');
            const lastName = formData.get('lastName');
            const email = formData.get('emailRegister');
            const password = formData.get('passwordSingUp');
            const repeatPassword = formData.get('repeatPasswordSingUp');

            if (repeatPassword == passwordValue && validatePassword()) {
                const data = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    acces_level: 1, // Nivel de acceso fijo
                    image: "", // Imagen fija
                }
                // Enviar los datos a la API
                fetch('https://667894100bd45250561f2838.mockapi.io/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        toastAlert("Usuario creado exitosamente")
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error
                    });
            }

        });


    }

    let btnTogglePassword = document.querySelectorAll(".togglePasswordRegister");
    btnTogglePassword.forEach(button => {


        button.addEventListener("click", () => {
            if (passwordRegister.type === "password") {
                passwordRegister.type = "text";
                confirmPasswordRegister.type = "text";
                for (let i = 0; i < icons.length; i++) {
                    icons[i].classList.remove("fa-lock");
                    icons[i].classList.add("fa-lock-open");
                }
            } else {
                passwordRegister.type = "password";
                confirmPasswordRegister.type = "password";
                for (let i = 0; i < icons.length; i++) {
                    icons[i].classList.remove("fa-lock-open");
                    icons[i].classList.add("fa-lock");
                }
            }
        })
    });



    
    const lengthDiv = document.querySelector('#length');
    const uppercaseDiv = document.querySelector('#uppercase');
    const specialCharDiv = document.querySelector('#special-char');
    const numberDiv = document.querySelector('#number');
    
    let iconLength = document.querySelector('.iconLength');
    let iconUppercase = document.querySelector('.iconUppercase');
    let iconSpecialChar = document.querySelector('.iconSpecialChar');
    let iconNumber = document.querySelector('.iconNumber');
    let inputPassword = document.getElementById("passwordSingUp");
    checkPassword();

    function checkPassword() {
        if (inputPassword) {
            inputPassword.addEventListener("input", validatePassword);
            validatePassword();            
        }
    }

    function validatePassword() {
        let password = inputPassword.value;
        passwordValue = inputPassword.value;
        let isValid = true;
        checkPasswordMatch();

        if (hasLength(password)) {
            updateIconStyle(borderWidth, iconLength, validColor, validBackground);
            iconLength.classList.add("fa-check");
            iconLength.classList.remove("fa-times");
        } else {
            updateIconStyle(borderWidth, iconLength, invalidColor, invalidBackground);
            isValid = false;
            iconLength.classList.remove("fa-check");
            iconLength.classList.add("fa-times");
        }

        if (hasUppercase(password)) {
            updateIconStyle(borderWidth, iconUppercase, validColor, validBackground);
            iconUppercase.classList.add("fa-check");
            iconUppercase.classList.remove("fa-times");
        } else {
            updateIconStyle(borderWidth, iconUppercase, invalidColor, invalidBackground);
            isValid = false;
            iconUppercase.classList.remove("fa-check");
            iconUppercase.classList.add("fa-times");
        }

        if (hasSpecialChar(password)) {
            updateIconStyle(borderWidth, iconSpecialChar, validColor, validBackground);
            iconSpecialChar.classList.add("fa-check");
            iconSpecialChar.classList.remove("fa-times");
        } else {
            updateIconStyle(borderWidth, iconSpecialChar, invalidColor, invalidBackground);
            isValid = false;
            iconSpecialChar.classList.remove("fa-check");
            iconSpecialChar.classList.add("fa-times");
        }

        if (hasNumber(password)) {
            updateIconStyle(borderWidth, iconNumber, validColor, validBackground);
            iconNumber.classList.add("fa-check");
            iconNumber.classList.remove("fa-times");
        } else {
            updateIconStyle(borderWidth, iconNumber, invalidColor, invalidBackground);
            isValid = false;
            iconNumber.classList.remove("fa-check");
            iconNumber.classList.add("fa-times");
        }

        return isValid;
    }

    function updateIconStyle(borderWidth, icon, color, background) {
        icon.style.border = `${borderWidth} solid ${color}`;
        icon.style.color = color;
        icon.style.background = background;
    }

    function hasLength(data) {
        return data.length >= 8;
    }

    function hasUppercase(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] >= 'A' && data[i] <= 'Z') {
                return true;
            }
        }
        return false;
    }

    function hasSpecialChar(data) {
        let specialChars = "!@#$%^&*(),.?\":{}|<>";
        for (let i = 0; i < data.length; i++) {
            if (specialChars.includes(data[i])) {
                return true;
            }
        }
        return false;
    }

    function hasNumber(data) {
        let numbers = "0123456789";
        for (let i = 0; i < data.length; i++) {
            if (numbers.includes(data[i])) {
                return true;
            }
        }
        return false;
    }
    function toastAlert(text) {
        Toastify({
            text: text,
            duration: 3000,
            destination: "https://github.com/jeep12",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                fontSize: "15px",
                backgroundImage: "linear-gradient(to right top, green, green, green, green, green)"
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }




});
