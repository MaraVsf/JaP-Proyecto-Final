

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector('[name="nombre"]').value;
  const password = document.querySelector('[name="contraseña"]').value;
  const email = document.querySelector('[name="email"]').value;
  const userData = {
    username: username,
    password: password
  };
  
  fetch("http://localhost:3000/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Verificar si data.token existe y su propiedad value es igual a true
    if (data.token) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("loggedIn", "true"); 
      location.href = "index.html";
    } else {
      alert("Credenciales incorrectas");
    }
  })
  .catch(error => {
    console.error('Error en la solicitud fetch:', error);
    // Manejar errores, por ejemplo, mostrar un mensaje al usuario
  });
  
});