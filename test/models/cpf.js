'use strict';

const mongoose = require('mongoose');
const expect = require('chai').expect;
const Cpf = require('../../app/models/Cpf.js');

describe('Model CPF', () => {

    before(done => {
        mongoose.connect('mongodb://localhost/cpf_tests');
        mongoose.connection.once('open', () => {
            done();
        });
    });

    beforeEach(() => {
        mongoose.connection.db.dropDatabase();
    });

    describe('validation', () => {

        it('valid cpf, save', done => {
            var cpf = new Cpf({
                cpf: '986.475.380-05',
            });

            cpf.save(done);
        });

        it('invalid cpf, throw error and dont save', done => {
            var cpf = new Cpf({
                cpf: '986.475.380-056',
                isValid: true,
            });

            cpf.save(err => {
                if (err) return done();
                throw new Error('Should generate error!');
            });
        });

    });

});
