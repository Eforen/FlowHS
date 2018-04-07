import { expect } from 'chai';
import { describe } from 'mocha';
import InputGateBit from './InputGateBit';
import * as TypeMoq from 'typemoq';


describe('Input Bit Gate', () => {
    let namesTable = [
        ['yolo', 'Input Bit (yolo)'],
        ['dsagwerb', 'Input Bit (dsagwerb)'],
        ['A', 'Input Bit (A)'],
        ['1', 'Input Bit (1)']
    ]
    namesTable.forEach((table) => {
        it('Input Bit Name should be ' + table[1], () => {
            let test = new InputGateBit(table[0])
            
            expect(test.name).to.equal(table[1])
        })
    })

    it('Input Bit set Value should update Output Bit', () => {
        let test = new InputGateBit('test')

        test.setValue(true) 
        expect(test.pinOut.getValue()).to.equal(true)

        test.setValue(true)
        expect(test.pinOut.getValue()).to.equal(true)
        test.setValue(false)
        expect(test.pinOut.getValue()).to.equal(false)
        test.setValue(true)
        expect(test.pinOut.getValue()).to.equal(true)
        test.setValue(false)
        expect(test.pinOut.getValue()).to.equal(false)
        
        let mock = TypeMoq.Mock.ofInstance(test.pinOut)
        test.pinOut.setValue = mock.object.setValue

        mock.setup(x => x.setValue(TypeMoq.It.isAny()))
            .verifiable(TypeMoq.Times.once())
        test.setValue(true) 
        
        mock.verifyAll()
    })
})