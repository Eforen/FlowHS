import { expect } from 'chai';
import { describe } from 'mocha';
import { nodeProcesser } from './nodeProcesser';
import { NodeState } from '../state/nodeState';
import { NodeTypes } from '../state/nodeTypes';
import { OutputTypes } from '../state/outputTypes';


describe('Node Gates', () => {

    let truthTables = [
        {
            skip: false,
            desc: 'AND',
            type: NodeTypes.BIT_AND,
            table: [
                [0, 0, 0],
                [0, 1, 0],
                [1, 0, 0],
                [1, 1, 1]
            ]
        }, {
            skip: false,
            desc: 'NAND',
            type: NodeTypes.BIT_NAND,
            table: [
                [0, 0, 1],
                [0, 1, 1],
                [1, 0, 1],
                [1, 1, 0]
            ]
        }, {
            skip: false,
            desc: 'OR',
            type: NodeTypes.BIT_OR,
            table: [
                [0, 0, 0],
                [0, 1, 1],
                [1, 0, 1],
                [1, 1, 1]
            ]
        }, {
            skip: false,
            desc: 'NOR',
            type: NodeTypes.BIT_NOR,
            table: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0],
                [1, 1, 0]
            ]
        }, {
            skip: false,
            desc: 'XOR',
            type: NodeTypes.BIT_XOR,
            table: [
                [0, 0, 0],
                [0, 1, 1],
                [1, 0, 1],
                [1, 1, 0]
            ]
        }, {
            skip: false,
            desc: 'XNOR',
            type: NodeTypes.BIT_XNOR,
            table: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0],
                [1, 1, 1]
            ]
        }
    ]

    truthTables.forEach((test) => {
        describe(test.desc, () => {
            let testType = test.type
            test.table.forEach((table) => {
                if (test.skip) {
                    it.skip(test.desc + ' Logic [' + table[0] + ', ' + table[1] + '] == ' + table[2], () => {})
                } else {
                    it(test.desc + ' Logic [' + table[0] + ', ' + table[1] + '] == ' + table[2], () => {
                        let node: NodeState = {
                            ID: 69,
                            name: 'Should not matter',
                            userName: 'who cares',
                            type: testType,
                            inputs: [
                                { name: 'A', value: table[0] == 1, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                                { name: 'B', value: table[1] == 1, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                            ],
                            outputs: [{
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: table[2] == 1,
                                connections: []
                            }],
                            changed: true
                        }
                        let test = nodeProcesser(node)

                        expect(test === node).to.equal(false, 'Object not changed')
                        expect(test.inputs[0].value).to.equal(table[0] == 1)
                        expect(test.inputs[1].value).to.equal(table[1] == 1)
                        expect(test.outputs[0].value).to.equal(table[2] == 1)
                        expect(test.changed).to.be.false

                        node.changed = false
                        test = nodeProcesser(node)

                        expect(test === node).to.equal(true, 'Object changed')
                        expect(test.inputs[0].value).to.equal(table[0] == 1)
                        expect(test.inputs[1].value).to.equal(table[1] == 1)
                        expect(test.outputs[0].value).to.equal(table[2] == 1)
                        expect(test.changed).to.be.false

                        node.outputs[0].value = !node.outputs[0].value
                        node.changed = true
                        test = nodeProcesser(node)

                        expect(test === node).to.equal(false, 'Object not changed')
                        expect(test.inputs[0].value).to.equal(table[0] == 1)
                        expect(test.inputs[1].value).to.equal(table[1] == 1)
                        expect(test.outputs[0].value).to.equal(table[2] == 1)
                        expect(test.changed).to.be.true
                    })
                }
            })
        })
    })
})