import { expect } from 'chai';
import { describe } from 'mocha';
import Connector from './Connector';
import BinaryBitConnector from './Builtin/BinaryBitConnector';
import Gate from './Gate';

describe('Gate', () => {
    it('should make self be the gate for connections created in the constructor', () => {
        let inputs = [new Connector('test1'), new Connector('test2'), new BinaryBitConnector('test 3')]
        let outputs = [new Connector('test4'), new BinaryBitConnector('test 5')]
        
        inputs.forEach((input) => {
            expect(input.gate).to.be.undefined
        })
        outputs.forEach((output) => {
            expect(output.gate).to.be.undefined
        })

        let test = new Gate('Test Gate', inputs, outputs);

        inputs.forEach((input) => {
            expect(input.gate).to.equal(test)
        })
        outputs.forEach((output) => {
            expect(output.gate).to.equal(test)
        })
    })
})