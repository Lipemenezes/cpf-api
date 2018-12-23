'use strict';

const mongoose = require('mongoose');
const cpfValidator = require('cpf');

const cpfSchema = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: cpf => cpfValidator.isValid(cpf),
            message: props => `${props.value} is not a valid cpf`,
        },
        set: cpf => cpfValidator.clear(cpf),
    },
    isValid: {
        type: Boolean,
        default: true,
        index: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Cpf', cpfSchema);
