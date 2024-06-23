
//Controla que tenga almenos una mayuscula, un numero, un caracter especial y longitud >= 8
function checkPassword() {

    const lengthDiv = document.querySelector('#length');
    const uppercaseDiv = document.querySelector('#uppercase');
    const specialCharDiv = document.querySelector('#special-char');
    const numberDiv = document.querySelector('#number');
    const passwordMatchDiv = document.querySelector('#password-match'); // Nueva línea
    
    let iconLength = document.querySelector('.iconLength');
    let iconUppercase = document.querySelector('.iconUppercase');
    let iconSpecialChar = document.querySelector('.iconSpecialChar');
    let iconNumber = document.querySelector('.iconNumber');
    
    const validColor = "green";
    const invalidColor = "gray";
    const validBackground = "white";
    const invalidBackground = "#ccc";
    const borderWidth = "1px";
    
    let inputPassword = document.getElementById("password");
    console.log(inputPassword);
    inputPassword.addEventListener("input", validatePassword);
    
    function validatePassword() {
        let password = inputPassword.value;
    
        if (hasLength(password)) {
            updateIconStyle(iconLength, validColor, validBackground);
        } else {
            updateIconStyle(iconLength, invalidColor, invalidBackground);
        }
    
        if (hasUppercase(password)) {
            updateIconStyle(iconUppercase, validColor, validBackground);
        } else {
            updateIconStyle(iconUppercase, invalidColor, invalidBackground);
        }
    
        if (hasSpecialChar(password)) {
            updateIconStyle(iconSpecialChar, validColor, validBackground);
        } else {
            updateIconStyle(iconSpecialChar, invalidColor, invalidBackground);
        }
    
        if (hasNumber(password)) {
            updateIconStyle(iconNumber, validColor, validBackground);
        } else {
            updateIconStyle(iconNumber, invalidColor, invalidBackground);
        }
    
    
    }
    
    function updateIconStyle(icon, color, background) {
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
    
}

export { checkPassword }; // Exportar la función checkPassword
