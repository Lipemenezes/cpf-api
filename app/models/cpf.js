'use strict';

const mongoose = require('mongoose');

const cpfSchema = new mongoose.Schema({
    cpf: String,
    isValid: Boolean,
});

module.exports = {
    Cpf: mongoose.model('Cpf', cpfSchema),
};
