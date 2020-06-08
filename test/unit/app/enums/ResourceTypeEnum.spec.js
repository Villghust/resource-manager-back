import chai from 'chai';
const { expect } = chai;

import ResourceType from '../../../../src/app/enums/ResourceTypeEnum.js';

context('ResourceType', () => {
    context('Validate Enum values', () => {
        it('PHYSICAL_SPACES must exist in the ResourceTypeEnum', () => {
            expect(ResourceType.PHYSICAL_SPACES).to.equal('physical_spaces');
        });

        it('MOBILE_EQUIPMENTS must exist in the ResourceTypeEnum', () => {
            expect(ResourceType.MOBILE_EQUIPMENTS).to.equal(
                'mobile_equipments'
            );
        });

        it('FURNITURE must exist in the ResourceTypeEnum', () => {
            expect(ResourceType.FURNITURE).to.equal('furniture');
        });
    });
});
