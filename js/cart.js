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




// Recuperar el carrito desde el almacenamiento local (si existe)
let allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let prodID = localStorage.getItem("prodID");
    let endpoint = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
    const response = await fetch(endpoint);
    const productCart = await response.json();

    // Verificar si el producto ya está en el carrito
    const productIndex = allProducts.findIndex(item => item.id === productCart.id);
    
    if (productIndex === -1) {
      // El producto no está en el carrito, agregarlo y establecer su subtotal
      productCart.subtotal = productCart.cost;
      allProducts.push(productCart);

      // Almacenar el carrito actualizado en el almacenamiento local
      localStorage.setItem('allProducts', JSON.stringify(allProducts));
    }

    // FUNCION QUE MUESTRA LA INFO DEL PRODUCTO
    console.log(productCart);

    // Mostrar el carrito completo
    console.log(allProducts);

    updateCartTable();

  } catch (err) {
    console.error(err);
  }
});

// Función para actualizar la tabla del carrito
function updateCartTable() {
  const cartTable = document.getElementById('cartTable');
  const tbody = cartTable.querySelector('tbody');

  // Limpiar el contenido existente de la tabla
  tbody.innerHTML = '';

  // Recorrer los productos en el carrito y agregar filas a la tabla
  allProducts.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.images[0]}" alt="imagenDeProducto"/>${product.name}</td>
      <td>${product.currency} ${product.cost}</td>
      <td>Cantidad: <input type="number" class="cantProd" value="${product.count}" min="1" data-product-index="${index}" /></td>
      <td>Subtotal: <span id="subProduct${index}">${product.currency}${product.subtotal}</span></td>
    `;
    tbody.appendChild(row);
  });

  // Agrega un evento input a los elementos de cantidad
  const cantidadInputs = document.querySelectorAll(".cantProd");
  cantidadInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const cantidad = parseInt(input.value);
      const productoIndex = parseInt(input.dataset.productIndex);
      const producto = allProducts[productoIndex];
      const nuevoSubtotal = producto.cost * cantidad;
      producto.subtotal = nuevoSubtotal;
      producto.count = cantidad;
      document.getElementById(`subProduct${productoIndex}`).textContent = `${producto.currency}${nuevoSubtotal}`;
      
    });
  });

   
}
