'use strict';

const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DEFAULT_PORT = 3000;

module.exports = () => {
    const app = express();
    app.set('port', process.env.port || DEFAULT_PORT);
    app.use(express.static('./public'));
    app.use(bodyParser.json());

    consign({ cwd: 'app' })
        .include('controllers')
        .then('routes')
        .into(app);

    const mongoHost = process.env.MONGO_HOST || 'localhost:27017';
    const mongoDbName = process.env.MONGO_DB_NAME || 'cpf';
    mongoose.connect(`mongodb://${mongoHost}/${mongoDbName}`);

    return app;
};
