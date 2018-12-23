'use strict';

const mongoose = require('mongoose');
const cpfValidator = require('cpf');
const Cpf = mongoose.model('Cpf');

describe('Model CPF', () => {

    describe('validation', () => {

        beforeEach(done => {
            Cpf.remove({});
            done();
        });

        it('valid cpf, should not throw error', done => {
            var cpf = new Cpf({
                cpf: cpfValidator.generate(true),
            });

            cpf.save(err => {
                if (err) throw new Error('Should not generate error!');
                done();
            });
        });

        it('invalid cpf, should throw error', done => {
            var cpf = new Cpf({
                cpf: cpfValidator.generate(true) + '1',
                isValid: true,
            });

            cpf.save(err => {
                if (err) return done();
                throw new Error('Should generate error!');
            });
        });

    });

});
