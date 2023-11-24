const express = require("express");
const app = express();
const puerto = 3000;
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const key = "clave";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(puerto, () => {
  console.log("servidor levantado en: " + puerto);
});

app.get("/categories", (req, res) => {
  const fileName = "/jsons/cats/cat.json";
  res.sendFile(__dirname + fileName);
});

//obtiene los productos de cada categoria
app.get("/cats_products/:catId", (req, res) => {
  res.sendFile(`${__dirname}/jsons/cats_products/${req.params.catId}.json`);
});

//obtiene la informacion de un producto especifico
app.get("/product-info/:prodId", (req, res) => {
  res.sendFile(`${__dirname}/jsons/products/${req.params.prodId}.json`);
});

//obtiene los comentarios de un producto
app.get("/products_comments/:prodId", (req, res) => {
  res.sendFile(
    `${__dirname}/jsons/products_comments/${req.params.prodId}.json`
  );
});

//Obtiene el producto para cargar al carrito
app.get("/cart", (req, res) => {
  const fileName = "/jsons/user_cart/25801.json";
  res.sendFile(__dirname + fileName);
});

//metodo post que recibe los datos del body de postman, crea un archivo json ("user-purchase") y coloca dichos datos
app.post("/cart", (req, res) => {
  let data = JSON.stringify(req.body);
  fs.writeFile("user-Purchase.json", data, function (err) {
    if (err) {
      return console.log(err);
    }
    res.send("El archivo se guardo con exito!");
  });
});

app.use(express.json());

// Endpoint para autenticar al usuario y generar el token JWT
let usuarios = [
  { id: 1, username: "admin", email: "admin@admin", password: "admin" },
];

//LOGIN USUARIO
app.post("/login", (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario existe por username o email
  const usuarioExistente = usuarios.find(
    (user) => user.username === username || user.email === email
  );

  if (usuarioExistente) {
    // Verificar las credenciales del usuario existente
    const credencialesValidas =
      usuarioExistente.username === username &&
      usuarioExistente.email === email &&
      usuarioExistente.password === password;

    if (!credencialesValidas) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return; // Termina la ejecución si las credenciales no son válidas
    }

    // Payload del token
    const payload = {
      username: username,
      // Puedes agregar más información al token si lo necesitas
    };

    // Generar el token JWT con una firma secreta (clave secreta)
    const token = jwt.sign(payload, "claveSecreta", { expiresIn: "1h" }); // Puedes ajustar el tiempo de expiración

    // Enviar el token como respuesta al cliente
    res.json({ token });
  } else {
    // Crear un nuevo usuario si no existe
    const nuevoUsuario = {
      id: usuarios.length + 1,
      username: username,
      email: email,
      password: password,
    };

    usuarios.push(nuevoUsuario);

    // Payload del token para el nuevo usuario
    const payload = {
      username: username,
      // Puedes agregar más información al token si lo necesitas
    };

    // Generar el token JWT con una firma secreta (clave secreta)
    const token = jwt.sign(payload, "claveSecreta", { expiresIn: "1h" }); // Puedes ajustar el tiempo de expiración

    // Enviar el token como respuesta al cliente
    res.json({ token });
  }
});
