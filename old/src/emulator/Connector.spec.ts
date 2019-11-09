import Connector from './Connector';
import { expect } from 'chai';
import { describe } from 'mocha';
import * as TypeMoq from 'typemoq';
import Wire from './Wire';
import Gate from './Gate';

describe('Connector', () => {
    describe('value', () => {
        it('Should Set & Get', () => {
            let test = new Connector('test');

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

        it('Should not update if not output no mater what', () => {
            let test = new Connector('test');
            let c1 = TypeMoq.Mock.ofInstance(new Connector('target1'))
            let c2 = TypeMoq.Mock.ofInstance(new Connector('target2'))
            let c3 = TypeMoq.Mock.ofInstance(new Connector('target3'))

            test.setValue(false)

            //TODO: Define mock
            c1.setup(x => x.update()).verifiable(TypeMoq.Times.never())
            c2.setup(x => x.update()).verifiable(TypeMoq.Times.never())
            c3.setup(x => x.update()).verifiable(TypeMoq.Times.never())

            test.output = false;
            test.connections = [new Wire(test, c1.object), new Wire(test, c2.object)]

            //Try to break it
            test.setValue(true)

            c1.verifyAll()
            c2.verifyAll()
        })

        it('Should Update output if changed', () => {
            let test = new Connector('test');
            let c1 = TypeMoq.Mock.ofInstance(new Connector('target1'))
            let c2 = TypeMoq.Mock.ofInstance(new Connector('target2'))
            let c3 = TypeMoq.Mock.ofInstance(new Connector('target3'))

            test.setValue(false)

            //TODO: Define mock
            c1.setup(x => x.update()).verifiable(TypeMoq.Times.once())
            c2.setup(x => x.update()).verifiable(TypeMoq.Times.once())
            c3.setup(x => x.update()).verifiable(TypeMoq.Times.never())

            test.output = true;
            test.connections = [new Wire(test, c1.object), new Wire(test, c2.object)]

            //Try to break it
            test.setValue(true)

            c1.verifyAll()
            c2.verifyAll()
        })


        it('Should not update output if not changed', () => {
            let test1 = () => {
                let test = new Connector('test');
                let c1 = TypeMoq.Mock.ofInstance(new Connector('target1'))
                let c2 = TypeMoq.Mock.ofInstance(new Connector('target2'))
                let c3 = TypeMoq.Mock.ofInstance(new Connector('target3'))

                test.setValue(false)

                //TODO: Define mock
                c1.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c2.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c3.setup(x => x.update()).verifiable(TypeMoq.Times.never())

                test.output = true;
                test.connections = [new Wire(test, c1.object), new Wire(test, c2.object)]

                //Try to break it
                test.setValue(false)

                c1.verifyAll()
                c2.verifyAll()
            }
            let test2 = () => {
                let test = new Connector('test');
                let c1 = TypeMoq.Mock.ofInstance(new Connector('target1'))
                let c2 = TypeMoq.Mock.ofInstance(new Connector('target2'))
                let c3 = TypeMoq.Mock.ofInstance(new Connector('target3'))

                test.setValue(true)

                //TODO: Define mock
                c1.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c2.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c3.setup(x => x.update()).verifiable(TypeMoq.Times.never())

                test.output = true;
                test.connections = [new Wire(test, c1.object), new Wire(test, c2.object)]

                //Try to break it
                test.setValue(true)

                c1.verifyAll()
                c2.verifyAll()
            }
            let test3 = () => {
                let test = new Connector('test');
                let c1 = TypeMoq.Mock.ofInstance(new Connector('target1'))
                let c2 = TypeMoq.Mock.ofInstance(new Connector('target2'))
                let c3 = TypeMoq.Mock.ofInstance(new Connector('target3'))

                test.setValue('yoloswag420noscope')

                //TODO: Define mock
                c1.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c2.setup(x => x.update()).verifiable(TypeMoq.Times.never())
                c3.setup(x => x.update()).verifiable(TypeMoq.Times.never())

                test.output = true;
                test.connections = [new Wire(test, c1.object), new Wire(test, c2.object)]

                //Try to break it
                test.setValue('yoloswag420noscope')

                c1.verifyAll()
                c2.verifyAll()
            }

            test1()
            test2()
            test3()
        })
    })

    describe('gate', () => {
        it('should update gate when updated', () => {
            let test = new Connector('test')
            let gate = TypeMoq.Mock.ofInstance(new Gate('test', [test], []))

            test.gate = gate.object

            expect(test.gate).to.not.be.undefined
            expect(test.gate).to.equal(gate.object)
            gate.setup(x => x.update(TypeMoq.It.isValue(test))).verifiable(TypeMoq.Times.once())

            test.update()

            gate.verifyAll()
        })
    })

    describe('type', () => {
        it('should default to type any', () => {
            expect(new Connector('test').type).to.be.equal('any')
        })
        it.skip('should not accept anything as a connect if is output', () => {
            //Maybe it should just check the other thing if something trys to connect to it
        })
        it('should be able to connect to type any if type is specifide', () => {
            let test = new Connector('test')
            let target = new Connector('target')

            expect(target.acceptedTypes).to.contain('any')
            expect(target.canConnectWith(test)).to.be.equal(true)

            test.type = 'foo'
            expect(target.canConnectWith(test)).to.be.equal(true)

            test.type = 'bar'
            expect(target.canConnectWith(test)).to.be.equal(true)
        })
        it('should be able to connect from accepted types only', () => {
            let test = new Connector('test')
            let target = new Connector('target')
            
            target.acceptedTypes = ['foo']
            
            expect(target.canConnectWith(test)).to.be.equal(false) //any only matches if target accepts that type

            test.type = 'foo'
            expect(target.canConnectWith(test)).to.be.equal(true) 

            test.type = 'bar'
            expect(target.canConnectWith(test)).to.be.equal(false)

            target.acceptedTypes = ['bar']

            test.type = 'foo'
            expect(target.canConnectWith(test)).to.be.equal(false)

            test.type = 'bar'
            expect(target.canConnectWith(test)).to.be.equal(true)
        })
    })
})