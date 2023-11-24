const express = require("express");
const app = express();
const puerto = 3000;
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');


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