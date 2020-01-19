import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'
import { FlowsState, Node, Flow, Connection } from '@/store/flows/types';
import uuid from 'uuid'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store: flows', () => {
    let store: Store<RootState>
    
    // beforeEach(() => {
    //   store = new Store(storeDef)
    // })

    describe('', () => {
        beforeEach(() => {
            store = new Store(storeDef())
            store.replaceState(storeDef().state as RootState)
            //console.log("New Store")
        })
        
        it.skip('connectToEmulator', ()=>{})

        it.skip('loadFlow', ()=>{})

        it.skip('loadClose', ()=>{})

        it('createFlow', ()=>{
            expect(Object.keys(store.state.flows.flows).length).to.equal(0, "flows are not empty at start")

            const checkFlow = (guid: string, filename: string, title: string, count: number = 1)=>{
                expect(Object.keys(store.state.flows.flows).length).to.equal(count, "cF: Node count wrong")
                // expect(store.state.flows.flows[guid].args.guid).to.equal(guid, 'cF: Guid is wrong')
                // expect(store.state.flows.flows[guid].args.x).to.equal(x, 'cF: X Pos is wrong')
                // expect(store.state.flows.flows[guid].args.y).to.equal(y, 'cF: Y Pos is wrong')
                // expect(store.state.flows.flows[guid].type).to.equal(type, 'cF: Type is wrong')
                // expect(store.state.flows.flows[guid].type).to.equal(type, 'cF: Type is wrong')
                
                expect(store.state.flows.flows[guid]).to.deep.equal({guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] })
            }

            const addFlow = (guid: string, filename: string, title: string, beforeCount: number = 0)=>{
                // Confirm State
                expect(Object.keys(store.state.flows.flows).length).to.equal(beforeCount, "aF: Nodes are not as expected at start")
                expect(guid).to.not.equal(filename, 'aF: Seting Up Test Failed')
                expect(filename).to.not.equal(title, 'aF: Seting Up Test Failed')
    
                // Setup it
                const flow: Flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }
                //const cmd = new CMDAddNode(node, flow.guid)

                // Do it
                //cmd.exe(store.dispatch, store.state)
                store.dispatch('flows/createFlow', flow)

                // Check it
                checkFlow(guid, filename, title, beforeCount + 1)
                return flow
            }

            const checkExists = (nodes: Flow[], checkCount: number, count: number) => {
                expect(nodes.length).to.equal(checkCount, "cE: Input is not as expected")
                expect(Object.keys(store.state.flows.flows).length).to.equal(count, "cE: Nodes are not as expected at start")
                nodes.forEach(value => {
                    const {guid, filename, title} = value

                    checkFlow(guid, filename, title, count)
                })
            }

            addFlow(uuid.v4(), uuid.v4(), uuid.v4(), 0)
        })

        it.skip('createNodeInSelectedFlow', ()=>{})

        it.skip('createNodeInFlow', ()=>{})

        it.skip('moveNode', ()=>{})

        it.skip('deleteNode', ()=>{})

        it.skip('createConnection', ()=>{})

        it.skip('deleteConnection', ()=>{})

    })
    
    // it('', () => {
    //     //expect(Object.keys(store.state.flows.flows).length).to.equal(0, "Nodes are not empty at start")
    //     expect(Object.keys(store.state.flows.flows).length).to.equal(0, "Nodes are not empty at start")
    //     const node: Node = {
    //         error: false,
    //         changed: false, 
    //         selected: false,
    //         type: 'Comment',
    //         args: {
    //             guid: '',
    //             x: 0,
    //             y: 0
    //         },
    //         inputState: [true],
    //         outputState: []
    //     }
    //     const cmd = new CMDAddNode(node, 'tester')
    //     console.log("store.state")
    //     console.log(localVue)
    //     console.log(store.state)
    //     console.log(store.state.flows.flows)
    //     cmd.exe(store.dispatch, store.state)
    //     expect(Object.keys(store.state.flows.flows).length).to.equal(0, "Nodes are not empty at start")
    // })
    })