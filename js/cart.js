let idusuario = 25801;
let carritoendpoint = `https://japceibal.github.io/emercado-api/user_cart/${idusuario}.json`;

fetch(carritoendpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    let cartContainer = document.getElementById("cartCont");
    let cartProd = data.articles;
    let cartContent = ``;

   cartProd.forEach(producto => {
    cartContent += `<img src=${producto.image} alt="imagenDeProducto" /> Producto: ${producto.name}, Precio: ${producto.currency} ${producto.unitCost} Cantidad: <input type="number" id="cantProd" value="${producto.count}" min="1" /> Subtotal: ${producto.currency}`
   });

   cartContainer.innerHTML = cartContent

    });
