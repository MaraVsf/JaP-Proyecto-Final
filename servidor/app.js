const express = require("express");
const app = express();
const puerto = 3000;
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const key = "clave";


app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());



app.listen(puerto,()=> {
    console.log("servidor levantado en: " + puerto);
});

app.get("/categories", (req, res) => {
    const fileName = "/jsons/cats/cat.json";
    res.sendFile(__dirname + fileName);
});

//obtiene los productos de cada categoria
app.get("/cats_products/:catId", (req, res)=>{
    res.sendFile(`${__dirname}/jsons/cats_products/${req.params.catId}.json`);
});

//obtiene la informacion de un producto especifico
app.get("/product-info/:prodId", (req, res)=>{
    res.sendFile(`${__dirname}/jsons/products/${req.params.prodId}.json`);
});



//obtiene los comentarios de un producto
app.get("/products_comments/:prodId", (req, res)=>{
    res.sendFile(`${__dirname}/jsons/products_comments/${req.params.prodId}.json`);
});


//Obtiene el producto para cargar al carrito
app.get("/cart", (req, res)=>{
    const fileName = "/jsons/user_cart/25801.json"
    res.sendFile(__dirname + fileName);
});

//metodo post que recibe los datos del body de postman, crea un archivo json ("user-purchase") y coloca dichos datos 
app.post("/cart", (req, res)=>{
    let data = JSON.stringify(req.body)
    fs.writeFile("user-Purchase.json", data, function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("El archivo se guardo con exito!");
    });
});


//LOGIN USUARIO


app.use(express.json());

// Endpoint para autenticar al usuario y generar el token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales del usuario (ejemplo simple)
  if (username === 'usuario' && password === '1234') {
    // Payload del token
    const payload = {
      username: username,
      // Puedes agregar más información al token si lo necesitas
    };

    // Generar el token JWT con una firma secreta (clave secreta)
    const token = jwt.sign(payload, 'claveSecreta', { expiresIn: '1h' }); // Puedes ajustar el tiempo de expiración

    // Enviar el token como respuesta al cliente
    res.json({token});
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Otro middleware y rutas...


/* app.use(bodyParser.json()); // <== ES UN MIDDLEWARE
// Parsea el cuerpo de las solicitudes en formato JSON.

//Nos inventamos datos de usuarios
let usuarios = [
    {id: 1, usuario:"juan", clave: "clavejuan"}, //la clave TIENE QUE ENCRIPTARSE ANTES de guardarse en la bbdd
    {id: 2, usuario: "maria", clave: "clavemaria"},
    {id: 3, usuario: "bruno", clave:"clavebruno"}
];



//Creo el middleware que va a chequear el login
function mwLogin(req, res, next){
const { usuario, clave} = req.body;

//¿Hay usuario y clave?
if (!usuario || !clave){
    return res.status(401).json({msj: 'Falta usuario o clave'});
}

//¿Existe el usuario y la clave  en mi lista?
const usuarioExiste = usuarios.find(user=> user.usuario ===usuario && user.clave===clave );
if (!usuarioExiste){
    return res.status(401).json({msj: 'Usuario o clave no válidos'});
}
//Genero el Token JWT
const token = jwt.sign({userId: usuario.id, username:usuarioExiste.usuario},key,{expiresIn: Math.floor(Date.now()/1000)+10});
console.log(token);
res.token = token;
next();
}

//Protejo la ruta con el token

app.post('/login', mwLogin, (req, res)=>{

    res.send('Te dejo ingresar y te di un token. ');
});

app.get('/lista-protegida',(req,res)=>{
    const token=req.headers['authorization'];
    //Si no hay token
    if(!token){
        return res.status(401).json({msj: 'No tenés permiso!!!'});
    }
    //Si hay, quiero ver si no está vencido.
    jwt.verify(token,key,(err, decoded)=>{
        if(err){
            return res.status(401).json({msj: 'Token vencido valor, andá a comprar otro.'});
        }
    //Si llego acá es porque está tooooodo bien.
   
    res.json({msj: 'Acceso permitido', usuario: decoded});    
    });
});


  // Endpoint POST /login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Buscar al usuario en la lista de usuarios
    const usuario = usuarios.find((u) => u.username === username && u.password === password);
  
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  
    // Generar un token con jsonwebtoken
    const token = jwt.sign({ userId: usuario.id, username: usuario.username }, 'secreto', { expiresIn: '1h' });
  
    // Devolver el token como respuesta
    res.json({ token });
  });
 
  // Endpoint POST /signup para crear un nuevo usuario
  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find((u) => u.username === username);
  
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
  
    // Crear un nuevo usuario
    const nuevoUsuario = {
      id: usuarios.length + 1,
      username,
      password,
    };
  
    // Agregar el nuevo usuario a la lista
    usuarios.push(nuevoUsuario);
  
    // Generar un token con jsonwebtoken para el nuevo usuario
    const token = jwt.sign({ userId: nuevoUsuario.id, username: nuevoUsuario.username }, 'secreto', { expiresIn: '1h' });
  
    // Devolver el token como respuesta
    res.json({ token });
  }); */