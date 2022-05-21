const {Customer, validate} = require('../modules/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Routes
// Listar todos los generos
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');

    res.send(customers);
});


// Buscar un cliente
router.get('/:id', async (req, res) => {
    // Buscar el cliente y comprobar si existe
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`The customer ${req.params.id} doesn't exist.`);

    // Si existe devuelvo el genero
    res.send(customer);
});

// Crear un nuevo customer
router.post('/', async (req, res) => {
    // Validar los datos que nos pasan en el body
    const result = validate(req.body);
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    customer = await customer.save();
    res.send(customer);

});

// Actualizar un genero
router.put('/:id', async (req, res) => {
    // Validate
    // const result = validate(req.body);
    const { error } = validate(req.body);

    // If invalid, return 400 - Bad Request
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone}, {new: true})

    // Buscar el customer y comprobar si existe
    if (!customer) return res.status(404).send(`The customer ${req.params.name} doesn't exist.`);

    // Actualizo el nombre 
    res.send(`The customer ${req.params.id} has been updated to ${customer.name}.`);
});

// Eliminar un customer
router.delete('/:id', async (req, res) => {
    // Buscar el customer y comprobar si existe
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send(`The genre ${req.params.name} doesn't exist.`);

    res.send(customer);
});

module.exports = router;