document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("email").value = localStorage.getItem("email");
  document.querySelector("#profileImage").src =
    localStorage.getItem("profileImage");

  loadData();
});

function loadData() {
  const localStorageItems = [
    "username",
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
        let inputNombre = document.querySelector("#username").value;
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

document
  .getElementById("imagenPerfil")
  .addEventListener("change", function (event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      try {
        let imageData = e.target.result;
        console.log(imageData);
        localStorage.setItem("profileImage", imageData);
        document.querySelector("#profileImage").src = imageData;
      } catch (error) {
        console.error("Failed to load resource:", error);
      }
    };

    reader.readAsDataURL(file);
  });
