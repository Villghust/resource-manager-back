import chai from 'chai';

import dataFaker from '../../config/dataFaker.js';
import req from '../../config/request.js';

import ResourceType from '../../../src/app/enums/ResourceTypeEnum.js';

const { expect } = chai;
const request = req();

const ROUTE = '/resources';

describe('CreateResources', () => {
    describe('POST /resources', () => {
        context('when creating a Resource with a valid request', () => {
            const me = {
                name: dataFaker.word(),
                type: ResourceType.MOBILE_EQUIPMENTS,
                cost: dataFaker.integer(),
            };

            const f = {
                name: dataFaker.word(),
                type: ResourceType.FURNITURE,
                cost: dataFaker.integer(),
            };

            const ps = {
                name: dataFaker.word(),
                type: ResourceType.PHYSICAL_SPACES,
                size: dataFaker.integer(),
                seat_quantity: dataFaker.integer(),
            };

            it('should create and return status code 201', async () => {
                const mobileEquipment = await request
                    .post(ROUTE)
                    .send(me)
                    .expect(201);

                expect(mobileEquipment.body).to.have.property('name');
                expect(mobileEquipment.body).to.have.property('type');
                expect(mobileEquipment.body).to.have.property('cost');
                expect(mobileEquipment.body.name).to.be.eql(me.name);
                expect(mobileEquipment.body.type).to.be.eql(
                    ResourceType.MOBILE_EQUIPMENTS
                );
                expect(mobileEquipment.body.cost).to.be.eql(me.cost);

                const furniture = await request.post(ROUTE).send(f).expect(201);

                expect(furniture.body).to.have.property('name');
                expect(furniture.body).to.have.property('type');
                expect(furniture.body).to.have.property('cost');
                expect(furniture.body.name).to.be.eql(f.name);
                expect(furniture.body.type).to.be.eql(ResourceType.FURNITURE);
                expect(furniture.body.cost).to.be.eql(f.cost);

                const physicalSpace = await request
                    .post(ROUTE)
                    .send(ps)
                    .expect(201);

                expect(physicalSpace.body).to.have.property('name');
                expect(physicalSpace.body).to.have.property('type');
                expect(physicalSpace.body).to.have.property('cost');
                expect(physicalSpace.body).to.have.property('size');
                expect(physicalSpace.body).to.have.property('seat_quantity');
                expect(physicalSpace.body).to.have.property('seat_cost');
                expect(physicalSpace.body.name).to.be.eql(ps.name);
                expect(physicalSpace.body.type).to.be.eql(
                    ResourceType.PHYSICAL_SPACES
                );
                expect(physicalSpace.body.cost).to.be.eql(15);
                expect(physicalSpace.body.size).to.be.eql(ps.size);
                expect(physicalSpace.body.seat_quantity).to.be.eql(
                    ps.seat_quantity
                );
                expect(physicalSpace.body.seat_cost).to.be.eql(5);
            });
        });

        context('when creating a Resource with an invalid request', () => {
            const invalidReq = {
                name: 'Sala',
                type: ResourceType.PHYSICAL_SPACES,
            };

            it('should return an error "Contract validation fails" with status code 400', async () => {
                const { body } = await request
                    .post(ROUTE)
                    .send(invalidReq)
                    .expect(400);

                expect(body).to.have.property('error');
                expect(body.error).to.eql('Contract validation fails');
            });
        });
    });
});
