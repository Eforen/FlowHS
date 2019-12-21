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
        store = new Store(storeDef)
        })
        
        it.skip('connectToEmulator', ()=>{})

        it.skip('loadFlow', ()=>{})

        it.skip('loadClose', ()=>{})

        it('createFlow', ()=>{
            expect(Object.keys(store.state.flows.flows).length).to.equal(0, "flows are not empty at start")
            const guid = uuid.v4()
            const filename = uuid.v4()
            const title = uuid.v4()
            const flow: Flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }
            store.dispatch('flows/createFlow', flow)
            expect(store.state.flows.flows[guid]).to.deep.equal({guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] })
        })

        it.skip('createNodeInSelectedFlow', ()=>{})

        it.skip('createNodeInFlow', ()=>{})

        it.skip('moveNode', ()=>{})

        it.skip('deleteNode', ()=>{})

        it.skip('createConnection', ()=>{})

        it.skip('deleteConnection', ()=>{})

    })
    
    // it('', () => {
    //     //expect(Object.keys(store.state.flows.nodes).length).to.equal(0, "Nodes are not empty at start")
    //     expect(Object.keys(store.state.flows.nodes).length).to.equal(0, "Nodes are not empty at start")
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
    //     console.log(store.state.flows.nodes)
    //     cmd.exe(store.dispatch, store.state)
    //     expect(Object.keys(store.state.flows.nodes).length).to.equal(0, "Nodes are not empty at start")
    // })
    })