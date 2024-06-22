const express = require("express");
const mysql = require("mysql");
const cors = require('cors')
const Connection = require("mysql/lib/Connection");
const { json } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

let conexion = mysql.createConnection({
    host: "localhost",
    database: "autodbuser",
    user: "root",
    password: "password"
})

app.set("view engine", "ejs");

//para traer informacion

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Rutas a cada pagina
app.get("/", function(req,res){
    res.render("index");
 });
app.get("/registro", function(req,res){
   res.render("registro");
});





app.post("/validar", function(req,res){
    const datos = req.body;
   
    let cedula = datos.cedula;
    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let password = datos.password;
    let correo = datos.correo;  


    let buscar = "SELECT * FROM user WHERE cedula = "+cedula +" ";
    conexion.query(buscar, function(error, row){
        if(error){
            throw error;
            }else{
                let mensaje;
                    if(row.length>0){
                        mensaje = ("No se Puede Registrar, Usuario ya Existe ");
                        res.render("registro", {mensaje});
                }else{
                    let registrar = "INSERT INTO user (cedula, nombre, apellido, correo,contrasenia) VALUES ('"+cedula +"', '"+nombre +"' , '"+apellido +"', '"+correo +"', '"+password+"')";
                conexion.query(registrar, function(error){
             if(error){
                 throw error;
        }else {
            mensaje = ("Datos almacenados exitoxamente, Usuario Registrado");
            res.render("registro", {mensaje});
        }
        });
        }
    }
})});

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("servidor creado htto://localhost:3000");
});