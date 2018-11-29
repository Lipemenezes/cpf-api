'use strict';

const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.set('views', './app/views');
    app.use(bodyParser.json());

    consign({ cwd: 'app' })
        .include('controllers')
        .then('routes')
        .into(app);

    mongoose.connect('mongodb://localhost/test');

    return app;
};
