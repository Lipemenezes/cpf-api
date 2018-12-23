'use strict';

const Cpf = require('../models/cpf.js');
const cpfValidator = require('cpf');

const DEFAULT_QUERY_LIMIT = 50;
const DEFAULT_FIELDS = { _id: 0, cpf: 1, isValid: 1 };

const getFilters = params => {
    const filters = {
        isDeleted: false,
    };

    if (params.cpf) {
        filters.cpf = { '$regex': params.cpf };
    }

    if (params.isValid) {
        filters.isValid = params.isValid;
    }

    return filters;
};

const getQuery = (filters, fields, limit, sort, skip) => {
    const query = Cpf
        .find(filters)
        .select(fields)
        .limit(limit);

    if (sort) {
        query.sort({ cpf: sort });
    }

    if (skip) { // params.page ? skip (page * limit)?
        query.skip(skip);
    }

    return query;
};

module.exports = {
    get: async (req, res) => {
        const params = req.query;
        const filters = getFilters(params);
        const query = getQuery(filters, DEFAULT_FIELDS, DEFAULT_QUERY_LIMIT, params.sort, params.skip);

        res.json({
            cpfs: await query,
            totalDocuments: await query.countDocuments(),
        });
    },

    upsert: async (req, res) => {
        const params = req.body;
        const updatedCpf = await Cpf.findOneAndUpdate(
            { cpf: params.cpf },
            { $set: params },
            { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
        );

        res.json({
            cpf: cpfValidator.format(updatedCpf.cpf),
            isValid: updatedCpf.isValid,
        });
    },

    delete: async (req, res) => {
        const params = req.body;

        // await Cpf.deleteOne({ cpf: cpfValidator.format(params.cpf) });

        const result = await Cpf.update({ cpf: cpfValidator.format(params.cpf) }, { '$set': { isDeleted: true } });

        res.status(result.ok ? 200 : 404).json();
    },
};
