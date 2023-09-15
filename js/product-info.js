//solicitud adecuada para obtener la información de dicho producto.
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let prodID = localStorage.getItem("prodID");

    let endpoint = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    const res = await fetch(endpoint);
    const productData = await res.json();

    //FUNCION QUE MUESTRA LA INFO DEL PRODUCTO
    showInfoProducts(productData);
    console.log(productData);

    let comentEndpoint = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
    const comentRes = await fetch(comentEndpoint);
    const comentData = await comentRes.json();
    console.log(comentData)

  } catch (err) {
    console.error(err);
  }

  // Obtén una lista de todas las miniaturas
  const miniaturas = document.querySelectorAll('.miniatura');
  const mainImage = document.getElementById('main-image');
  
  // Agrega un controlador de eventos a cada miniatura
  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {
      mainImage.src = miniatura.src;
      mainImage.alt = miniatura.alt;
    });
  });

  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('rating');

  let selectedRating = 0;

  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          selectedRating = index + 1; // Suma 1 para obtener la puntuación real

          // Marca como activa todas las estrellas hasta la que se hizo clic
          for (let i = 0; i <= index; i++) {
              stars[i].classList.add('active');
          }

          // Desmarca las estrellas después de la que se hizo clic
          for (let i = index + 1; i < stars.length; i++) {
              stars[i].classList.remove('active');
          }

          // Actualiza el valor del campo de entrada oculto
          ratingInput.value = selectedRating;
      });
  });

});


function showInfoProducts(productData) {
  let container = document.getElementById("container");

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
        <p id="precio">USD ${productData.cost}</p>
        <p> <b>Categoria:</b> ${productData.category}</p>
        <p> <b>Cantidad de vendidos: </b> ${productData.soldCount}</p>
      </div>
    </div>

    <div class="row comentarios-container">
      <hr>
      <div id="comentarios" class="mt-4 col-7">
        COMENTARIOS
      </div>
      
      <div class="col-5 tucomentario">
        <h4>Agrega un comentario</h4>
        <label for="puntos">Puntuación<br>
          <div id="puntos" class="custom-select star-rating" style="margin-bottom:20px;">
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
          </div>      
          </select>
        </label><br>
        <label for="cuadrocom">Opinión<br>
          <textarea placeholder="Escriba aquí su comentario..." style="height: 100px; width: 400px;" id="comment"></textarea><br>
        </label><br> 
        <button class="btn btn-primary" id="botonEnv" onclick="agregarComentario()" style=>Enviar</button>
      </div>
    </div>
    `;
  container.innerHTML = productInfoHTML;
}

function agregarComentario() {
  let comentar = document.getElementById("comment").value;
  let puntaje = parseInt(document.getElementById("puntos").value);

  let estrellasHTML = ratingInput;

  let nuevoComentario = `
      <div class="comentario">
          <p class="puntuacion">${estrellasHTML}</p>
          <p class="comentario-texto">${comentar}</p>
      </div>
  `;

  document.getElementById("comentarios").innerHTML += nuevoComentario;
  
  document.getElementById("comment").value="";
  document.getElementById("puntos").value="";
}

function generarEstrellas(puntuacion) {
  let estrellaLlena = "<img src='img/estrellaCompleta.svg' alt='Estrella completa' width='15px'>";
  let estrellaVacia = "<img src='img/estrellaVacia.svg' alt='Estrella vacía'  width='15px'>";
  
  let estrellasHTML = "";
  
  for (let i = 0; i < 5; i++) {
      if (i < puntuacion) {
          estrellasHTML += estrellaLlena;
      } else {
          estrellasHTML += estrellaVacia;
      }
  }
  
  return estrellasHTML;
}
