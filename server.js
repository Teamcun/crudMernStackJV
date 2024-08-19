



const express = require('express')
const app = express()

//importar conexion DB
const archivoDB = require('./conexion')

//importar archivo de rutas y modelo usuario
const rutausuario = require('./rutas/usuario')

//importar body parser

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/usuario', rutausuario)

app.get('/',(req,res)=>{
    res.end('Bienvenidos al servidor backend NODE.js corriendo...')
})
//configuracion del server
app.listen(5000, function(){
    console.log('El servidor NODE.js esta corriendo sin problemas')
})