
function register() {
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


    confirmPasswordRegister.addEventListener("input", () => {
        let confirmPassword = confirmPasswordRegister.value;
        let iconPasswordMatch = document.getElementById("iconPasswordMatch");
        const passwordMatchDiv = document.querySelector('#passwordMatch');

        if (confirmPassword == passwordValue) {
            updateIconStyle(borderWidth, iconPasswordMatch, validColor, validBackground);
        } else {
            updateIconStyle(borderWidth, iconPasswordMatch, invalidColor, invalidBackground);

        }

    })

    //levanto form con FormData

    const form = document.getElementById('formRegister');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        const formData = new FormData(form);

        const name = formData.get('name');
        const lastName = formData.get('lastName');
        const email = formData.get('emailRegister');
        const password = formData.get('passwordSingUp');
        const repeatPassword = formData.get('repeatPasswordSingUp');

        if (repeatPassword == passwordValue) {
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



    checkPassword();

    function checkPassword() {


        const lengthDiv = document.querySelector('#length');
        const uppercaseDiv = document.querySelector('#uppercase');
        const specialCharDiv = document.querySelector('#special-char');
        const numberDiv = document.querySelector('#number');

        let iconLength = document.querySelector('.iconLength');
        let iconUppercase = document.querySelector('.iconUppercase');
        let iconSpecialChar = document.querySelector('.iconSpecialChar');
        let iconNumber = document.querySelector('.iconNumber');



        let inputPassword = document.getElementById("passwordSingUp");
        inputPassword.addEventListener("input", validatePassword);

        function validatePassword() {
            let password = inputPassword.value;
            passwordValue = inputPassword.value;
            let isValid = true;

            if (hasLength(password)) {
                updateIconStyle(borderWidth, iconLength, validColor, validBackground);
            } else {
                updateIconStyle(borderWidth, iconLength, invalidColor, invalidBackground);
                isValid = false;
            }

            if (hasUppercase(password)) {
                updateIconStyle(borderWidth, iconUppercase, validColor, validBackground);
            } else {
                updateIconStyle(borderWidth, iconUppercase, invalidColor, invalidBackground);
                isValid = false;
            }

            if (hasSpecialChar(password)) {
                updateIconStyle(borderWidth, iconSpecialChar, validColor, validBackground);
            } else {
                updateIconStyle(borderWidth, iconSpecialChar, invalidColor, invalidBackground);
                isValid = false;
            }

            if (hasNumber(password)) {
                updateIconStyle(borderWidth, iconNumber, validColor, validBackground);
            } else {
                updateIconStyle(borderWidth, iconNumber, invalidColor, invalidBackground);
                isValid = false;
            }

            return isValid;
        }

        return validatePassword();
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


}


export { register }; // Exportar la función checkPassword
