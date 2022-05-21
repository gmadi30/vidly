const {Genre, validate} = require('../modules/genre');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Routes

// Listar todos los generos
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    
    res.send(genres);

});

// Buscar un genero
router.get('/:id', async (req, res) => {
    // Buscar el genero y comprobar si existe
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`The genre ${req.params.id} doesn't exist.`);

    // Si existe devuelvo el genero
    res.send(genre);
});

// Crear un nuevo genero
router.post('/', async (req, res) => {
    // Validar los datos que nos pasan en el body
    const result = validate(req.body);
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save();
    res.send(genre);

});

// Actualizar un genero
router.put('/:id', async (req, res) => {
    // Validate
    const result = validate(req.body);
    const { error } = validate(req.body);

    // If invalid, return 400 - Bad Request
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true})

    // Buscar el genero y comprobar si existe
    if (!genre) return res.status(404).send(`The genre ${req.params.name} doesn't exist.`);

    
    
    
    // Actualizo el nombre 
    res.send(`The genre ${req.params.id} has been updated to ${genre.name}.`);
});

//Eliminar un genero
router.delete('/:id', async (req, res) => {
    // Buscar el genero y comprobar si existe
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send(`The genre ${req.params.name} doesn't exist.`);

    // Guardo la posicion del genero encontrado
    res.send(genre);
});

module.exports = router;