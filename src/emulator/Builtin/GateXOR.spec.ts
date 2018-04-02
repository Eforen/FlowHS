import { expect } from 'chai';
import { describe } from 'mocha';
import GateXOR from './GateXOR';

describe('XOR Gates', () => {
    let truthTable = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0]
    ]
    truthTable.forEach((table) => {
        it('XOR Logic [' + table[0] + ', ' + table[1] + '] == ' + table[2], () => {
            let test = new GateXOR()

            test.pinA.setValue(table[0] == 1)
            test.pinB.setValue(table[1] == 1)
            test.pinB.update()
            expect(test.pinOut.getValue()).to.equal(table[2] == 1)
        })
    })
})