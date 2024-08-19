const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const eschema = mongoose.Schema;

const eschemausuario = new eschema({
    nombre: String,
    email: String,
    telefono: String,
    idusuario: String
});

const ModeloUsuario = mongoose.model('usuarios', eschemausuario);

router.get('/ejemplo', (req, res) => {
    res.end('carga desde ruta ejemplo');
});

router.get('/ejemplo2', (req, res) => {
    res.end('carga desde la ruta Test');
});

// Obtener todos los usuarios
router.get('/obtenerususario', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find({});
        res.send(usuarios);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
router.get('/obtenerususario',(req,res)=>{
    ModeloUsuario.find({},funcion(docs,err))
    if(!err){
        res.send(docs)
    }else{
        res.send(err)
    }
})*/

// Obtener datos de un usuario por idusuario
router.post('/obtenerdataususario', async (req, res) => {
    try {
        const usuario = await ModeloUsuario.find({ idusuario: req.body.idusuario });
        res.send(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
});

//agragar usuario
router.post('/agregarusuario', async (req, res) => {
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idusuario: req.body.idusuario
    });

    try {
        await nuevousuario.save();
        res.send('Usuario agregado correctamente');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Actualizar usuario
router.post('/actualizarusuario', async (req, res) => {
    try {
        const usuarioActualizado = await ModeloUsuario.findOneAndUpdate(
            { idusuario: req.body.idusuario },
            {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono,
                idusuario: req.body.idusuario
            },
            { new: true } // Esto devuelve el documento actualizado
        );

        if (usuarioActualizado) {
            res.send('Usuario actualizado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Eliminar usuario
router.post('/borrarususario', async (req, res) => {
    try {
        const usuarioBorrado = await ModeloUsuario.findOneAndDelete({ idusuario: req.body.idusuario });
        if (usuarioBorrado) {
            res.send('Usuario borrado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
