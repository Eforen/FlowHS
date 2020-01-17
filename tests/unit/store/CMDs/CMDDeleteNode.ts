import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'
import CMDRemoveNode from '@/store/commands/cmds/CMDRemoveNode'
import { Node, Flow } from '@/store/flows/types'
import uuid from 'uuid'

const localVue = createLocalVue()
localVue.use(Vuex)

export const tests_CMDRemoveNode = () => {
    describe('CMD: CMDRemoveNode', () => {
        let store: Store<RootState>
        let flow: Flow
        
        let prep = () => {
            // Setup Store
            store = new Store(storeDef)

            // Setup Default Flow
            const guid = uuid.v4()
            const filename = uuid.v4()
            const title = uuid.v4()
            flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }

            store.dispatch('flows/createFlow', flow)
          
        }
      
        beforeEach(prep)

        it.skip('Do/Undo', () => {
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
                const cmd = new CMDRemoveNode(node, flow.guid)
                //console.log("store.state")
                //console.log(localVue)
                //console.log(store.state)
                //console.log(store.state.flows.nodes)
                cmd.exe(store.dispatch, store.state)
                checkNode(guid, x, y, type, inputState, outputState, beforeCount + 1)
                return {node, cmd}
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

            const procIn = (nodes: Node[], cmds: CMDRemoveNode[], checkCount: number, count: number, arg: {node: Node, cmd: CMDRemoveNode}) => {
                checkExists(nodes, checkCount, count)
                nodes.push(arg.node)
            }

            const procOut = (nodes: Node[], cmds: CMDRemoveNode[], checkCount: number, count: number) => {
                checkExists(nodes, checkCount, count)
                let node = nodes.pop() as Node
                let cmd: CMDRemoveNode = cmds.pop() as CMDRemoveNode
                cmd.undo(store.dispatch, store.state)
                nodes.push(node)
            }
            
            let nodes: Node[] = []
            let cmds: CMDRemoveNode[] = []
            procIn(nodes, cmds, 1, 1, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], []))
            procIn(nodes, cmds, 2, 2, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [true], [], 1))
            procIn(nodes, cmds, 3, 3, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false], [], 2))
            procIn(nodes, cmds, 4, 4, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true], [], 3))
            procIn(nodes, cmds, 5, 5, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true, false], [], 4))
            procIn(nodes, cmds, 6, 6, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [true], 5))
            procIn(nodes, cmds, 7, 7, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false], 6))
            procIn(nodes, cmds, 8, 8, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false, true], 7))
            procIn(nodes, cmds, 9, 9, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [], [false, true, false], 8))
            procIn(nodes, cmds, 10, 10, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true, false], [true], 9))
            procIn(nodes, cmds, 11, 11, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false, true], [false], 10))
            procIn(nodes, cmds, 12, 12, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [false], [false, true], 11))
            procIn(nodes, cmds, 13, 13, addNode(uuid.v4(), Math.random() * 100, Math.random() * 100, uuid.v4(), [true], [false, true, false], 12))


            procOut(nodes, cmds, 13, 13)
            procOut(nodes, cmds, 12, 12)
            procOut(nodes, cmds, 11, 11)
            procOut(nodes, cmds, 10, 10)
            procOut(nodes, cmds, 9, 9)
            procOut(nodes, cmds, 8, 8)
            procOut(nodes, cmds, 7, 7)
            procOut(nodes, cmds, 6, 6)
            procOut(nodes, cmds, 5, 5)
            procOut(nodes, cmds, 4, 4)
            procOut(nodes, cmds, 3, 3)
            procOut(nodes, cmds, 2, 2)
            procOut(nodes, cmds, 1, 1)
        })
        it.skip('clone')
        it.skip('canMerge')
        it.skip('merge')
      })
}