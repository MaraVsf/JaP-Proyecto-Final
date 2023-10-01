const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const botonDropdown = document.querySelector('.dropdown');
const contenidoDropdown = document.querySelector('.dropdown-content');

botonDropdown.addEventListener('click', () => {
  contenidoDropdown.classList.toggle('active');
})


// Modo oscuro //
// Obtén una referencia al botón
const toggleButton = document.getElementById('toggle');

// Obtén todos los elementos con la clase "light" y "light2"
const elementsToToggle = document.querySelectorAll('.light, .light2');

// Agrega un evento de clic al botón
toggleButton.addEventListener('click', () => {

  // Itera a través de los elementos y cambia entre "light" y "dark-mode"
  elementsToToggle.forEach((element) => {
    if (element.classList.contains('light')) {
      element.classList.replace('light', 'dark-mode');
    } else if (element.classList.contains('dark-mode')) {
      element.classList.replace('dark-mode', 'light');
    }

    if (element.classList.contains('light2')) {
      element.classList.replace('light2', 'dark-mode2');
    } else if (element.classList.contains('dark-mode2')) {
      element.classList.replace('dark-mode2', 'light2');
    }
  });
});
