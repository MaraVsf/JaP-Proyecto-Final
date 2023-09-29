//solicitud adecuada para obtener la información de dicho producto.
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let prodID = localStorage.getItem("prodID");

    let endpoint = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    const res = await fetch(endpoint);
    const productData = await res.json();

    //FUNCION QUE MUESTRA LA INFO DEL PRODUCTO
    showInfoProducts(productData, comentData);
    console.log(productData);

    let comentEndpoint = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
    const comentRes = await fetch(comentEndpoint);
    const comentData = await comentRes.json();
    console.log(comentData);

  } catch (err) {
    console.error(err);
  }

  // Miniatura a Imagen principal
  const miniaturas = document.querySelectorAll('.miniatura');
  const mainImage = document.getElementById('main-image');
  
  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {
      mainImage.src = miniatura.src;
      mainImage.alt = miniatura.alt;
    });
  });

  // Calificar con Estrellas
  let stars = document.querySelectorAll('.star');
  let ratingInput = document.getElementById('rating');
  let botonEnv = document.getElementById('botonEnv');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const clickedIndex = parseInt(star.getAttribute('data-index')); // Data-index de las estrellas
        let selectedRating = clickedIndex + 1;

        // Activacion de las estrellas
        for (let i = 0; i <= clickedIndex; i++) {
            stars[i].classList.add('active');
        }

        // Desactivacion
        for (let i = clickedIndex + 1; i < stars.length; i++) {
            stars[i].classList.remove('active');
        }

        ratingInput.value = selectedRating; // Puntuacion guardada
    });
  });

  botonEnv.addEventListener('click', () => {
    agregarComentario();
  })

});


function showInfoProducts(productData, comentData) {
  let container = document.getElementById("container");
  let comentarios = document.getElementById("comentarios");
  let tucomentario = document.getElementById("tucomentario");

  let productInfoHTML = `
    <div class="row product-container">
      <div class="col-7 product-images">
        <div class="miniatura-images">
          <img src="${productData.images[0]}" alt="${productData.name}" class="miniatura">
          <img src="${productData.images[1]}" alt="${productData.name}" class="miniatura">
          <img src="${productData.images[2]}" alt="${productData.name}" class="miniatura">
          <img src="${productData.images[3]}" alt="${productData.name}" class="miniatura">
        </div>
        <div class="principal-image">
          <img src="${productData.images[0]}" alt="${productData.name}" id="main-image">
        </div>
      </div>

      <div class="col-5 caractproducto">
        <h2>${productData.name}</h2>
        <p>${productData.description}</p>
        <p id="precio">UYU ${productData.cost}</p>
        <p> <b>Categoria:</b> ${productData.category}</p>
        <p> <b>Cantidad de vendidos: </b> ${productData.soldCount}</p>
      </div>
    </div>`

    let comentariosHTML =
        `<h4>COMENTARIOS</h4>
        <div class="comentario">
              <p class="puntuacion">${generarEstrellas(comentData[0].score)}<span class="fecha"> ${comentData[0].dateTime}</span></p>
              <p class="comentario-texto">${comentData[0].description}</p>
              <p class="usuario"><b>-${comentData[0].user}</b></p>
        </div>
        <div class="comentario">
              <p class="puntuacion">${generarEstrellas(comentData[1].score)}<span class="fecha"> ${comentData[1].dateTime}</span></p>
              <p class="comentario-texto">${comentData[1].description}</p>
              <p class="usuario"><b>-${comentData[1].user}</b></p>
        </div>
        <div class="comentario">
              <p class="puntuacion">${generarEstrellas(comentData[2].score)}<span class="fecha"> ${comentData[2].dateTime}</span></p>
              <p class="comentario-texto">${comentData[2].description}</p>
              <p class="usuario"><b>-${comentData[2].user}</b></p>
        </div>
        <div class="comentario">
              <p class="puntuacion">${generarEstrellas(comentData[3].score)}<span class="fecha"> ${comentData[3].dateTime}</span></p>
              <p class="comentario-texto">${comentData[3].description}</p>
              <p class="usuario"><b>-${comentData[3].user}</b></p>
        </div>`

    let tucomentarioHTML =
        `<h4>Agrega un comentario</h4>
        <label for="estrellas">Toca una estrella para calificar
          <div id="puntos" class="custom-select star-rating">
            <input type="hidden" id="rating" value="0">
            <span class="star" data-index="0">&#9733;</span>
            <span class="star" data-index="1">&#9733;</span>
            <span class="star" data-index="2">&#9733;</span>
            <span class="star" data-index="3">&#9733;</span>
            <span class="star" data-index="4">&#9733;</span>
          </div>
        </label><br>
        <label for="cuadrocom">
          <textarea placeholder="Escriba aquí su comentario..." id="comment-nuevo"></textarea><br>
        </label><br> 
        <button class="btn btn-primary" id="botonEnv" style=>Enviar</button>
    `;
  container.innerHTML = productInfoHTML;
  comentarios.innerHTML = comentariosHTML;
  tucomentario.innerHTML = tucomentarioHTML;
}

function agregarComentario() {
  let comentar = document.getElementById("comment-nuevo").value;
  let puntaje = parseInt(document.getElementById("rating").value); // Obtén la puntuación del campo oculto
  let usuario = username;
  let fecha = obtenerFechaActual();
  let stars = document.querySelectorAll('.star');

  if (puntaje > 0 && puntaje <= 5) {
      let estrellasHTML = generarEstrellas(puntaje);

      const nuevoComentario = `
          <div class="comentario">
              <p class="puntuacion">${estrellasHTML}<span class="fecha"> ${fecha}</span></p>
              <p class="comentario-texto">${comentar}</p>
              <p class="usuario"><b>-${usuario}</b></p>
          </div>
      `;

      document.getElementById("comentarios").innerHTML += nuevoComentario;
      console.log(stars);
      // Restaura la selección de estrellas y el campo de comentario
      stars.forEach(star => star.classList.remove('active'));
      document.getElementById("comment-nuevo").value = "";
      document.getElementById("rating").value = "0";
  } else {
      alert("Por favor, selecciona una puntuación válida.");
  }
}

function obtenerFechaActual() {
  const fecha = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}



function generarEstrellas(puntaje) {
  let estrellaLlena = "<img src='img/estrellaCompleta.svg' alt='Estrella completa' width='15px'>";
  let estrellaVacia = "<img src='img/estrellaVacia.svg' alt='Estrella vacía'  width='15px'>";
  
  let estrellasHTML = "";
  
  for (let i = 0; i < 5; i++) {
      if (i < puntaje) {
          estrellasHTML += estrellaLlena;
      } else {
          estrellasHTML += estrellaVacia;
      }
  }
  
  return estrellasHTML;
}