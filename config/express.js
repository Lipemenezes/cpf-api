'use strict';

const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.set('port', process.env.port || 3000);
    app.use(express.static('./public'));
    app.use(bodyParser.json());

    consign({ cwd: 'app' })
        .include('controllers')
        .then('routes')
        .into(app);

    const mongoHost = process.env.mongoHost || 'localhost';
    const mongoDbName = process.env.MONGO_DB_NAME || 'cpf';
    mongoose.connect(`mongodb://${mongoHost}/${mongoDbName}`);

    return app;
};
