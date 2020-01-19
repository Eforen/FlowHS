import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'
import CMDAddNode from '@/store/commands/cmds/CMDAddNode'
import { Node, Flow } from '@/store/flows/types'
import uuid from 'uuid'

const localVue = createLocalVue()
localVue.use(Vuex)

export const tests_CMDAddNode = () => {
    describe('CMD: CMDAddNode', () => {
        let store: Store<RootState>
        let flow: Flow
        
        let prep = () => {
            // Setup Store
            store = new Store(storeDef())
            store.replaceState(storeDef().state as RootState)

            // Setup Default Flow
            const guid = uuid.v4()
            const filename = uuid.v4()
            const title = uuid.v4()
            flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }

            store.dispatch('flows/createFlow', flow)
          
        }
      
        beforeEach(prep)

        it('Do/Undo', () => {
            const checkNode = (guid: string, x: number, y:number, type: string, inputState: boolean[], outputState: boolean[], count: number = 1)=>{
                expect(Object.keys(store.state.flows.nodes).length).to.equal(count, "cN: Node count wrong")
                expect(store.state.flows.nodes[guid].args.guid).to.equal(guid, 'cN: Guid is wrong')
                expect(store.state.flows.nodes[guid].args.x).to.equal(x, 'cN: X Pos is wrong')
                expect(store.state.flows.nodes[guid].args.y).to.equal(y, 'cN: Y Pos is wrong')
                expect(store.state.flows.nodes[guid].type).to.equal(type, 'cN: Type is wrong')
                expect(store.state.flows.nodes[guid].type).to.equal(type, 'cN: Type is wrong')
                // expect(store.state.flows.nodes[guid].type).to.be(guid, 'Type is wrong')
            }

            const addNode = (guid: string, x: number, y:number, type: string, inputState: boolean[], outputState: boolean[], beforeCount: number = 0)=>{
                //expect(Object.keys(store.state.flows.nodes).length).to.equal(0, "Nodes are not empty at start")
                expect(Object.keys(store.state.flows.nodes).length).to.equal(beforeCount, "aN: Nodes are not as expected at start")
                
                expect(guid).to.not.equal(type, 'aN: Seting Up Test Failed')
    
                const node: Node = {
                    error: false,
                    changed: false, 
                    selected: false,
                    type,
                    args: {
                        guid,
                        x,
                        y
                    },
                    inputState: [],
                    outputState: []
                }
                const cmd = new CMDAddNode(node, flow.guid)
                //console.log("store.state")
                //console.log(localVue)
                //console.log(store.state)
                //console.log(store.state.flows.nodes)
                cmd.exe(store.dispatch, store.state)
                checkNode(guid, x, y, type, inputState, outputState, beforeCount + 1)
                return node
            }

            const checkExists = (nodes: Node[], checkCount: number, count: number) => {
                expect(nodes.length).to.equal(checkCount, "cE: Input is not as expected")
                expect(Object.keys(store.state.flows.nodes).length).to.equal(count, "cE: Nodes are not as expected at start")
                nodes.forEach(value => {
                    const {args, type, inputState, outputState} = value
                    const {guid, x, y} = args

                    checkNode(guid, x, y, type, inputState, outputState, count)
                })
            }
            
            let nodes: Node[] = []
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], []))
            checkExists(nodes, 1, 1)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [true], [], 1))
            checkExists(nodes, 2, 2)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false], [], 2))
            checkExists(nodes, 3, 3)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true], [], 3))
            checkExists(nodes, 4, 4)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true, false], [], 4))
            checkExists(nodes, 5, 5)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [true], 5))
            checkExists(nodes, 6, 6)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false], 6))
            checkExists(nodes, 7, 7)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false, true], 7))
            checkExists(nodes, 8, 8)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false, true, false], 8))
            checkExists(nodes, 9, 9)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true, false], [true], 9))
            checkExists(nodes, 10, 10)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true], [false], 10))
            checkExists(nodes, 11, 11)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false], [false, true], 11))
            checkExists(nodes, 12, 12)
            nodes.push(addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [true], [false, true, false], 12))
            checkExists(nodes, 13, 13)
        })
        it.skip('clone')
        it.skip('canMerge')
        it.skip('merge')
      })
}