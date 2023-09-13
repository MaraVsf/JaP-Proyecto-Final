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

});

function showInfoProducts(productData) {
  let container = document.getElementById("container");

  let productInfoHTML = `
    <div class="container">
      <div class="row col-6 product-container">
        <div class="principal-image">
          <img src="${productData.images[0]}" alt="${productData.name}" id="main-image" width="500px" height="300px" >
        </div>
        <div class="miniautura-images"
          <img src="${productData.images[0]}" alt="${productData.name}" class="miniatura" width="500px" height="300px" >
          <img src="${productData.images[1]}" alt="${productData.name}" class="miniatura" width="500px" height="300px">
          <img src="${productData.images[2]}" alt="${productData.name}" class="miniatura" width="500px" height="300px">
          <img src="${productData.images[3]}" alt="${productData.name}" class="miniatura" width="500px" height="300px">
        </div>
      </div>
      <div class="row col-6 caractproducto">
        <h2>${productData.name}</h2>
        <p>${productData.description}</p>
        <p id="precio">USD ${productData.cost}</p>
        <p> <b>Categoria:</b> ${productData.category}</p>
        <p> <b>Cantidad de vendidos: </b> ${productData.soldCount}</p>
      </div>
    </div>  

    <div class="container comentarioscontainer">
      <hr>
      <div id="comentarios" class="mt-4 row col-6">
        COMENTARIOS
      </div>
      
      <div class="row col-6 tucomentario">
        <h4>Agrega un comentario</h4>
        <label for="puntos">Tu puntuación<br>
          <select id="puntos" class="custom-select" style="margin-bottom:20px;">
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label><br>
        <label for="cuadrocom">Tu opinión<br>
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

  let estrellasHTML = generarEstrellas(puntaje);

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


