let idusuario = 25801;
let carritoendpoint = `https://japceibal.github.io/emercado-api/user_cart/${idusuario}.json`;

fetch(carritoendpoint)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    return response.json();
  })

  .then((data) => {
    let cartContainer = document.getElementById("cart-list");
    let cartProd = data.articles;
    let cartContent = "";
    let subtotal = 0;
    function CalcularSubtotal(cantidad, precio) {
      return cantidad * precio;
    }
    cartProd.forEach((producto, index) => {
      let cantidad = producto.count;
      let precio = producto.unitCost;
      let subtotalProducto = CalcularSubtotal(cantidad, precio);
      subtotal += subtotalProducto;
      cartContent += `
            <img src="${producto.image}" alt="imagenDeProducto" />
            Producto: ${producto.name}, Precio: ${producto.currency} ${producto.unitCost}
            Cantidad: <input type="number" class="cantProd" value="${cantidad}" min="1" data-product-index="${index}" />
            Subtotal: <span id="subtotalProducto${index}">${producto.currency}${subtotalProducto}</span>
            <br>
        `;
    });

    cartContainer.innerHTML = cartContent;
    let cantidadInputs = document.querySelectorAll(".cantProd");
    cantidadInputs.forEach((input) => {
      input.addEventListener("input", () => {
        let cantidad = parseInt(input.value);
        let productoIndex = parseInt(input.dataset.productIndex);
        let producto = cartProd[productoIndex];
        let nuevoSubtotal = CalcularSubtotal(cantidad, producto.unitCost);
        producto.subtotal = nuevoSubtotal;
        producto.count = cantidad;
        document.getElementById(
          `subtotalProducto${productoIndex}`
        ).textContent = `${producto.currency}${nuevoSubtotal}`;
        subtotal = cartProd.reduce((total, prod) => total + prod.subtotal, 0);
        document.getElementById(
          "subtotal"
        ).textContent = `Subtotal: ${data.articles[0].currency}${subtotal}`;
      });
    });

    document.getElementById(
      "subtotal"
    ).textContent = `Subtotal: ${data.articles[0].currency}${subtotal}`;
  });
