import { expect } from 'chai';
import { describe } from 'mocha';
import GateXNOR from './GateXNOR';

describe('XNOR Gates', () => {
    let truthTable = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
    ]
    truthTable.forEach((table) => {
        it('XNOR Logic [' + table[0] + ', ' + table[1] + '] == ' + table[2], () => {
            let test = new GateXNOR()

            test.pinA.setValue(table[0] == 1)
            test.pinB.setValue(table[1] == 1)
            test.pinB.update()
            expect(test.pinOut.getValue()).to.equal(table[2] == 1)
        })
    })
})