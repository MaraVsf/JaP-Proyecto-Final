//solicitud adecuada para obtener la información de dicho producto.
document.addEventListener("DOMContentLoaded", async () => {
    try {
       let prodID= localStorage.getItem("prodID");

        let endpoint = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
       
        const res = await fetch(endpoint);
        const productData = await res.json();
         
        //FUNCION QUE MUESTRA LA INFO DEL PRODUCTO
        showInfoProducts(productData);
        console.log(productData);

    } catch (err) {
        console.error(err);
    }
});

function showInfoProducts(productData){
    let container = document.getElementById("container");

    let productInfoHTML = `
    <h2>${productData.name}</h2>
    <p>Precio: USD ${productData.cost}</p>
    <p>${productData.description}</p>
    <p>Categoria: ${productData.category}</p>
    <p>Cantidad de vendidos: ${productData.soldCount}</p>
    <img src="${productData.images[0]}" alt="${productData.name}">
    <img src="${productData.images[1]}" alt="${productData.name}">
    <img src="${productData.images[2]}" alt="${productData.name}">
    <img src="${productData.images[3]}" alt="${productData.name}">
    `
    container.innerHTML = productInfoHTML ;
}