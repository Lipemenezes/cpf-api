'use strict';



module.exports = app => {
    const controller = app.controllers.index;
    app.get('/', controller.index);
};
