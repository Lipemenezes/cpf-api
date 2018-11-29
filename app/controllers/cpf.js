'use strict';

const Cpf = require('../models/cpf.js');
const cpfValidator = require('cpf');

module.exports = {
    get: async (req, res) => {
        const params = req.query;

        // validar params.filters.cpf

        // params.sort
        // params.page ? limit/offset
        const query = Cpf.find(params.filters);
        // const count = query.countDocuments();
        query.select({ _id: 0, cpf: 1, isValid: 1 });

        if (params.sort) {
            query.sort({
                cpf: params.sort.cpf 
            })
        }
        
        res.json({
            cpfs: await query,
            // count,
        });
    },
    upsert: async (req, res) => {
        const params = req.body;

        // validar params.cpf

        const updatedCpf = await Cpf.findOneAndUpdate(
            { cpf: params.cpf }, 
            { $set: params }, 
            { upsert: true, new: true },
        );
        
        res.json({
            cpf: cpfValidator.format(updatedCpf.cpf),
            isValid: updatedCpf.isValid,
        });
    },
    delete: async (req, res) => {
        const params = req.body;

        // validar params.cpf

        await Cpf.deleteOne({ cpf: cpfValidator.format(params.cpf) });
        
        res.json();
    }
};
