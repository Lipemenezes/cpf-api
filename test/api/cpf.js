'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const cpfValidator = require('cpf');

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

    before(done => {
        mongoose.connect('mongodb://localhost/cpf_tests');
        mongoose.connection.once('open', () => {
            // mongoose.connection.db.dropDatabase();
            done();
        });
    });

    describe('/GET', () => {

        before(done => {
            Cpf.deleteMany({}).then(() => {
                new Cpf({ cpf: '735.613.230-30' }).save();
                done();
            });
        });

        it('/GET cpf, get saved cpfs', done => {
            chai.request(server)
                .get('/cpf')
                .end(async (err, res) => {
                    error(err);
                    res.should.have.status(200);
                    expect(res.body.cpfs.length).to.be.above(0);
                    done();                    
                });
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

    it('/DELETE cpf, should delete cpf', done => {
        const cpf = '698.444.450-00';

        doPost({ cpf } , (err, res) => {
            chai.request(server)
                .delete('/cpf')
                .set('content-type', 'application/json')
                .send({ cpf })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
