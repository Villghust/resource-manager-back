import chai from 'chai';
const { expect } = chai;

import Enum from '../../../../src/app/enums/Enum.js';

context('Enum', () => {
    const myEnum = Enum({
        SOME_VALUE: 'someValue',
        ANOTHER_VALUE: 'anotherValue',
    });

    context('Validate Enum values', () => {
        it('should create an Enum with specified values', () => {
            expect(myEnum).to.have.property('SOME_VALUE');
            expect(myEnum).to.have.property('ANOTHER_VALUE');
            expect(myEnum.SOME_VALUE).to.equal('someValue');
            expect(myEnum.ANOTHER_VALUE).to.equal('anotherValue');
        });
    });

    context('Values() function', () => {
        it('should return the enum values', (done) => {
            const enumValues = myEnum.values();

            expect(enumValues.length).to.equal(2);
            expect(
                enumValues.some((value) => value === 'someValue')
            ).to.be.true();
            expect(
                enumValues.some((value) => value === 'anotherValue')
            ).to.be.true();
            done();
        });
    });

    context('Keys() Function', () => {
        it('should return the enum keys', (done) => {
            const enumValues = myEnum.keys();

            expect(enumValues.length).to.equal(2);
            expect(
                enumValues.some((value) => value === 'SOME_VALUE')
            ).to.be.true();
            expect(
                enumValues.some((value) => value === 'ANOTHER_VALUE')
            ).to.be.true();
            done();
        });
    });

    context('Key(value) Function', () => {
        it('should return the enum key to a specific value', (done) => {
            expect(myEnum.key('someValue')).to.equal('SOME_VALUE');
            expect(myEnum.key('anotherValue')).to.equal('ANOTHER_VALUE');
            done();
        });
    });
});
