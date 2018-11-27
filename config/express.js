'use strict';

const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');

module.exports = () => {
    const app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.set('views', './app/views');

    consign({ cwd: 'app' })
        .then('models')
        .include('controllers')
        .then('routes')
        .into(app);

    mongoose.connect('mongodb://localhost/test');

    return app;
};
