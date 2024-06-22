const express = require("express");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

const app = express();
let conexion = mysql.createConnection({
    host: "localhost",
    database: "autodbuser",
    user: "root",
    password: "password"
})

app.set("view engine", "ejs");

//para traer informacion
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req,res){
   res.render("registro");
});


app.listen(3000, function(){
    console.log("servidor creado htto://localhost:3000");
});


let buscar = "SELECT * FROM autodbuser WHERE cedula = "+cedula +" ";
    conexion.query(buscar, function(error, row){
        if(error){
            throw error;
            }else{
                    if(row.legth>0){
                        console.log("no se puede registrar, usuario ya existe con ese ID");
                }else{
                    let registrar = "INSERT INTO user (cedula, nombre, apellido, correo,contrasenia) VALUES ('"+cedula +"', '"+nombre +"' , '"+apellido +"', '"+correo +"', '"+password+"')";
                conexion.query(registrar, function(error){
             if(error){
                 throw error;
        }else {
            console.log("Datos almacenados exitoxamente");
        }
                
    });