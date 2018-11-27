'use strict';

const mongoose = require('mongoose');
const CPF = require('cpf');

const cpfSchema = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: cpf => CPF.isValid(cpf),
            message: props => `${props.value} is not a valid cpf`,
        },
        set: cpf => cpf.replace(/\D/g,''),
    },
    isValid: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Cpf', cpfSchema);
