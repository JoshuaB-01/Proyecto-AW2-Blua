
const formLogIn = document.getElementById("logInForm");
const error = document.getElementById("error");

formLogIn.addEventListener('submit', (e) => {
    e.preventDefault();
    logIn();
});

const logIn = async () => {
    try {
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;

        const res = await fetch('http://localhost:3001/users/login', { 
            method: 'POST',
            body: JSON.stringify({ email, contraseña }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Respuesta del servidor:', res);

        if (!res.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await res.json();
        console.log('Datos recibidos:', data);

        if (data.status) {
            console.log(data);
            sessionStorage.setItem('user', JSON.stringify(data));
            console.log('Usuario almacenado en sessionStorage:', sessionStorage.getItem('user'));
            window.location.href = "pages/home.html";
        } else {
            error.textContent = "Error al encontrar al usuario";
        }
    } catch (error) {
        console.error('Error:', error);
        error.textContent = "Error en la conexión o en la solicitud.";
    }
};