import chai from 'chai';

import req from '../../config/request.js';

import ResourceType from '../../../src/app/enums/ResourceTypeEnum.js';

const { expect } = chai;
const request = req();

const ROUTE = '/resources';

describe('ListResources', () => {
    describe('GET /resources', () => {
        context('when requested without any param', () => {
            it('should return all the resources with status code 200', async () => {
                const { body } = await request.get(ROUTE).expect(200);

                expect(body).to.have.property('resources');
            });
        });

        context('when requested with param', () => {
            it('should return all the resources filtered by the type and status code 200', async () => {
                const { body } = await request
                    .get(`${ROUTE}?type=mobile_equipments`)
                    .expect(200);

                expect(body).to.have.property('resources');
                expect(body.resources[0]).to.have.property('name');
                expect(body.resources[0]).to.have.property('cost');
                expect(body.resources[0]).to.have.property('type');
                expect(body.resources[0].type).to.be.eql(
                    ResourceType.MOBILE_EQUIPMENTS
                );
            });
        });
    });
});
