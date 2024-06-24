const formLogin = document.getElementById("formLogin");

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const formData = new FormData(formLogin);
    const email = formData.get('emailLogin');
    const password = formData.get('passwordLogin');

    try {
        // Obtener todos los usuarios desde la API
        const users = await getAllUsers("https://667894100bd45250561f2838.mockapi.io/api/users");

        // Verificar si las credenciales coinciden con algún usuario de la API
        const authenticatedUser = users.find(user => user.email === email && user.password === password);

        if (authenticatedUser) {
            // Si las credenciales coinciden, guardar usuario en localStorage para mantener la sesión
            localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
            toastAlert(`¡Bienvenido de nuevo, ${authenticatedUser.name}!`);
            setTimeout(function () {
                window.location="index.html";
           
            }, 1500); 

            console.log('Sesión iniciada correctamente para:', authenticatedUser);
        } else {
            // Si no coincide la contraseña o el usuario no existe, mostrar mensaje de error
            if (users.some(user => user.email === email)) {
                // Usuario existe pero contraseña incorrecta
                toastAlert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
            } else {
                // Usuario no encontrado
                toastAlert('Usuario no encontrado. Por favor, verifica tu email.');
            }
        }
    } catch (error) {
        console.error('Error al obtener usuarios desde la API:', error);
        // Mostrar un mensaje de error genérico si falla la obtención de usuarios
        toastAlert('Error al intentar iniciar sesión. Por favor, inténtalo más tarde.');
    }
});

// Función para obtener todos los usuarios desde la API
async function getAllUsers(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}

// Función para mostrar un mensaje de alerta usando Toastify
function toastAlert(text) {
    Toastify({
        text: text,
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
