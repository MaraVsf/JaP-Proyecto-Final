let idusuario = 25801;
let carritoendpoint = `https://japceibal.github.io/emercado-api/user_cart/?idusuario=${idusuario}`;

fetch(carritoendpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });
