'use strict';

module.exports = app => {
    const controller = app.controllers.cpf;
    app.get('/cpf?', controller.get);
};
