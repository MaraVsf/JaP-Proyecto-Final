document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("email").value = localStorage.getItem("email");

  loadData();
});

function loadData() {
  const localStorageItems = [
    "nombre",
    "segNombre",
    "apellido",
    "segApellido",
    "email",
    "telefono",
  ];

  localStorageItems.forEach((item) => {
    document.getElementById(`${item}`).value = localStorage.getItem(item);
  });
}

// Validación con Bootstrap
(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        let inputNombre = document.querySelector("#nombre").value;
        let inputSegNombre = document.querySelector("#segNombre").value;
        let inputApellido = document.querySelector("#apellido").value;
        let inputSegApellido = document.querySelector("#segApellido").value;
        let inputEmail = document.querySelector("#email").value;
        let inputTelefono = document.querySelector("#telefono").value;

        if (inputNombre != "" && inputApellido != "" && inputEmail != "") {
          if (inputNombre != "") {
            localStorage.setItem("username", inputNombre);
          }
          if (inputSegNombre != "") {
            localStorage.setItem("segNombre", inputSegNombre);
          }
          if (inputApellido != "") {
            localStorage.setItem("apellido", inputApellido);
          }
          if (inputSegApellido != "") {
            localStorage.setItem("segApellido", inputSegApellido);
          }
          if (inputEmail != "") {
            localStorage.setItem("email", inputEmail);
          }
          if (inputTelefono != "") {
            localStorage.setItem("telefono", inputTelefono);
          }
        }
      },
      false
    );
  });
})();
