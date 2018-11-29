'use strict';


module.exports = app => {
    const controller = app.controllers.cpf;
    app.get('/cpf?', controller.get);
    app.post('/cpf', controller.upsert);
    app.delete('/cpf', controller.delete);
};
