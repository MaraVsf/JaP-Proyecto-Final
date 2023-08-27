
// Area para integracion de productos en HTML.

const objeto_productos = [];
let container = document.querySelector("#productsContainer");
let minCount = undefined; // Variable para valor minimo de precio
let maxCount = undefined; // Variable para valor maximo de precio

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let catID = localStorage.getItem("catID");
        catID = parseInt(catID);

        let endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
        const res = await fetch(endpoint);
        const data = await res.json();
        const objeto_productos = data;

        let catName = data.catName;
        let catArticulos = document.querySelector(".lead");
        catArticulos.innerHTML = `Verás aquí todos los productos de la categoría ${catName}`

        let tarjeta = '';

        for (let producto of objeto_productos.products) {
            tarjeta += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card mb-4 custom-shadow h-100 bg-light cursor-active">
                        <img src="./${producto.image}" class="card-img-top" alt="${producto.name}">
                        <div class="card-body">
                            <p class="card-text"> 
                                <p class="nameCar">${producto.name}</p>
                                <p class="desCar">${producto.description}</p>
                            </p>    
                        </div>    
                            <div class="priceAmount d-flex justify-content-between align-items-center">
                                <p class="priceCar">USD ${producto.cost}</p>
                                <p class="amountCar ms-auto me-0">${producto.soldCount}</p>
                            </div>
                    </div>
                </div>`;
        }
    
        container.innerHTML += `
            <div class="album py-5">
                <div class="container">
                    <div class="row">
                        ${tarjeta}
                    </div>
                </div>
            </div>`;
    
    } catch (err) {
        console.error(err);
    }
});

// Falta hacer que se muestre la lista de los productos según rango de precio al filtrar por rango de precio y al limpiar (crear función para eso)
document.addEventListener("DOMContentLoaded", function(e){

    // Función de Filtrar por rango de precio
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        //Mostrar los productos con el filtro, Ej: showProductsList();
    });

    // Función de Limpiar los filtros
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        
        //Ej: showProductsList();
    });

    
});