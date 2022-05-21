const mongoose = require('mongoose');
const Joi = require('joi');

// Modelo con su schema 
const Customer = new mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    } 
}));

// Validador
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean().required()
    })

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;

