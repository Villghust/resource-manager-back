import chai from 'chai';

import dataFaker from '../../config/dataFaker.js';
import req from '../../config/request.js';

const { expect } = chai;
const request = req();

const ROUTE = '/users';

describe('CreateUser', () => {
    describe('POST /users', () => {
        context('when creating an User with a valid request', () => {
            const user = {
                name: dataFaker.word(),
                email: dataFaker.email(),
                registration: dataFaker.word(),
            };

            it('should create and return status code 201', async () => {
                const { body } = await request
                    .post(ROUTE)
                    .send(user)
                    .expect(201);

                expect(body).to.have.property('name');
                expect(body).to.have.property('email');
                expect(body).to.have.property('registration');
                expect(body.name).to.eql(user.name);
                expect(body.email).to.eql(user.email);
                expect(body.registration).to.eql(user.registration);
            });
        });

        context('when creating an User with an invalid request', () => {
            const user = {
                name: 0,
                email: 0,
                registration: 0,
            };

            it('should return an error "Contract validation fails" with status code 400', async () => {
                const { body } = await request
                    .post(ROUTE)
                    .send(user)
                    .expect(400);

                expect(body).to.have.property('error');
                expect(body.error).to.eql('Contract validation fails');
            });
        });

        context(
            'when creating an User with a valid request but with email or registration already registered',
            () => {
                const user = {
                    name: 'Otavio Bonder',
                    email: 'm.carmo@acad.pucrs.br',
                    registration: '17204044',
                };

                it('should return an error "User already exists" with status code 422', async () => {
                    const { body } = await request
                        .post(ROUTE)
                        .send(user)
                        .expect(422);

                    expect(body).to.have.property('error');
                    expect(body.error).to.eql('User already exists');
                });
            }
        );
    });
});
