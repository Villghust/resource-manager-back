import chai from 'chai';

import req from '../../config/request.js';

const { expect } = chai;
const request = req();

const ROUTE = '/cost';

describe('UpsertCost', () => {
    describe('POST /cost', () => {
        context('when creating the Cost entity', () => {
            const cost = {
                cost: 10,
                seat_cost: 8,
            };

            it('should create and return status code 200', async () => {
                const { body } = await request
                    .post(ROUTE)
                    .send(cost)
                    .expect(200);

                expect(body).to.have.property('cost');
                expect(body).to.have.property('seat_cost');
                expect(body.cost).to.eql(10);
                expect(body.seat_cost).to.eql(8);
            });
        });

        context('when updating the Cost entity', () => {
            const newCost = {
                cost: 15,
                seat_cost: 5,
            };

            it('should update and return status code 200', async () => {
                const { body } = await request
                    .post(ROUTE)
                    .send(newCost)
                    .expect(200);

                expect(body).to.have.property('cost');
                expect(body).to.have.property('seat_cost');
                expect(body.cost).to.eql(15);
                expect(body.seat_cost).to.eql(5);
            });
        });
    });
});
