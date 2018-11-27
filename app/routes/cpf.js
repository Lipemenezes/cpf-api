'use strict';



module.exports = function (app) {
    const controller = app.controllers.cpf;
    app.get('/cpf?', controller.get);
};
