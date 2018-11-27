'use strict';


// const videoInformationAPI = require('../api/videoInformationAPI');

module.exports = {
    get: () => {
        const validateParameters = function validateParameters(params) {
            return true;
        };

        const params = req.query;
        const errorList = validateParameters(params);

        if (errorList.length > 0) {
            res.json({ 'status': 'ERR', 'errors': errorList });
        } else {
            // get
        }
    },
};
