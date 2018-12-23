'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const server = require('../../server');
const Cpf = mongoose.model('Cpf');

chai.use(chaiHttp);

describe('API CPF', () => {

    const doPost = (cpfObj, cb) => {
        return chai.request(server)
            .post('/cpf')
            .set('content-type', 'application/json')
            .send(cpfObj)
            .end((err, res) => {
                cb(err, res);
            });
    };

    const error = err => {
        if (err) throw new Error('Failed');
    };

    before(done => { // TODO externalizar p/ não precisar repetir em todos testes
        mongoose.connect('mongodb://localhost/cpf_tests');
        mongoose.connection.once('open', () => {
            done();
        });
    });

    beforeEach(done => {
        Cpf.remove({}, done);
    });

    describe('/GET', () => {

        const verifySort = (isDesc, sortedCpfs, done) => {
            Cpf.insertMany([
                new Cpf({ cpf: '61448478049', isValid: true }),
                new Cpf({ cpf: '88015080002', isValid: true }),
                new Cpf({ cpf: '49623525044', isValid: true }),
            ], () => {
                chai.request(server)
                    .get(`/cpf?sort=${isDesc ? -1 : 1}`)
                    .end((err, res) => {
                        error(err);
                        res.should.have.status(200);
                        res.body.cpfs.forEach((cpf, index) => {
                            expect(cpf.cpf).to.equal(sortedCpfs[index]);
                        });
                        done();
                    });
            });
        };

        const verifyFilters = (cpfs, filter, done) => {
            Cpf.insertMany(cpfs, () => {
                chai.request(server)
                    .get(`/cpf?${filter}`)
                    .end((err, res) => {
                        error(err);
                        res.should.have.status(200);
                        expect(res.body.cpfs.length).to.equal(1);
                        done();
                    });
            });
        };

        beforeEach(done => {
            Cpf.remove({}, done);
        });

        it('/GET cpf, should get all saved cpfs', done => {
            const cpfs = [{ cpf: '73561323030' }];
            verifyFilters(cpfs, '', done);
        });

        it('/GET cpf passing cpf filter, should return only matching cpfs', done => {
            const cpfs = [
                new Cpf({ cpf: '61448478049', isValid: true }),
                new Cpf({ cpf: '88015080002', isValid: true }),
                new Cpf({ cpf: '49623525044', isValid: true }),
            ];
            verifyFilters(cpfs, 'cpf=61448', done);
        });

        it('/GET cpf passing isValid filter = true, should return only valid cpfs', done => {
            const cpfs = [
                new Cpf({ cpf: '61448478049', isValid: false }),
                new Cpf({ cpf: '88015080002', isValid: false }),
                new Cpf({ cpf: '49623525044', isValid: true }),
            ];
            verifyFilters(cpfs, 'isValid=true', done);
        });

        it('/GET with order -1, should order desc by field cpf', done => {
            const sortedCpfs = [
                '88015080002',
                '61448478049',
                '49623525044',
            ];
            verifySort(true, sortedCpfs, done);
        });

        it('/GET with order 1, should order by asc field cpf', done => {
            const sortedCpfs = [
                '49623525044',
                '61448478049',
                '88015080002',
            ];
            verifySort(false, sortedCpfs, done);
        });

    });

    it('/POST inexistent cpf, should create new cpf', done => {
        const cpf = '204.773.310-33';

        doPost({ cpf }, (err, res) => {
            error(err);
            res.should.have.status(200);
            res.body.cpf.should.be.eql(cpf);
            res.body.isValid.should.be.eql(true);
            done();
        });
    });

    it('/POST existing cpf, should update existing cpf', done => {
        const cpf = '316.500.310-68';

        doPost({ cpf } , (err, res) => {
            error(err);
            doPost({ cpf, isValid: false } , (err, res) => {
                error(err);
                res.should.have.status(200);
                res.body.cpf.should.be.eql(cpf);
                res.body.isValid.should.be.eql(false);
                done();
            });
        });
    });

    it('/DELETE cpf, should logically delete cpf', done => {
        const cpf = '698.444.450-00';

        doPost({ cpf } , (err, res) => {
            error(err);

            chai.request(server)
                .delete('/cpf')
                .set('content-type', 'application/json')
                .send({ cpf })
                .end((err, res) => {
                    error(err);
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
