import BinaryBitConnector from './BinaryBitConnector';
import { expect } from 'chai';
import { describe } from 'mocha';
import Connector from '../Connector';

describe('BinaryBitConnector', () => {

    it('should be of type Connector', () => {
        expect(new BinaryBitConnector('test0')).to.be.instanceof(Connector)
    })

    it('should have type bit', () => {
        expect(new BinaryBitConnector('test1').type).to.equal('bit')
    })

    it('should accept type bit', () => {
        expect(new BinaryBitConnector('test2').acceptedTypes).to.contain('bit')
    })
    //type check
    //accepted types check
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
})