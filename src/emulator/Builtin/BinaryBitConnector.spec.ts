import BinaryBitConnector from './BinaryBitConnector';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('BinaryBitConnector', () => {
    it('Should Set & Get', () => {
        let test = new BinaryBitConnector('test');

        test.setValue(true)
        expect(test.getValue()).to.be.equal(true)
        test.setValue(false)
        expect(test.getValue()).to.be.equal(false)
        test.setValue(true)
        expect(test.getValue()).to.be.equal(true)
        test.setValue(true)
        expect(test.getValue()).to.be.equal(true)
        test.setValue(true)
        test.setValue(false)
        test.setValue(false)
        test.setValue(true)
        test.setValue(false)
        expect(test.getValue()).to.be.equal(false)
        test.setValue(true)
        test.setValue(false)
        test.setValue(false)
        test.setValue(true)
        test.setValue(false)
        test.setValue(true)
        expect(test.getValue()).to.be.equal(true)
    })

    it.skip('Should Update output if changed', () => {
        let test = new BinaryBitConnector('test');

        throw 'not implimented';
    })


    it.skip('Should not update output if not changed', () => {
        throw 'not implimented';
    })
})