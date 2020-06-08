import chai from 'chai';

import req from '../../config/request.js';

const { expect } = chai;
const request = req();

const ROUTE = '/users';

describe('ListUsers', () => {
    describe('GET /users', () => {
        context('when requested', () => {
            it('should return all the users with status code 200', async () => {
                const { body } = await request.get(ROUTE).expect(200);

                expect(body).to.have.property('users');
            });
        });
    });
});
