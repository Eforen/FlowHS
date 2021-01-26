import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import { MakeSimulationActions, SimulationActions } from '@/store/simulation/actions'
import * as uuid from 'uuid'
import { SimulationConnection, SimulationNode } from '@/store/simulation/types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store: Simulation', () => {
  //let getters
  let store: Store<RootState>

  beforeEach(() => {
    store = new Store(storeDef())
    store.replaceState(storeDef().state as RootState)
  })

  it('AddNode / RemoveNode', () => {
    const guids = [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4()]
    const nodeStates = [
      ()=>({guid: guids[0], inputState: [false,false], outputState: [false,false], type: 'TYPE00'} as SimulationNode),
      ()=>({guid: guids[1], inputState: [true,true], outputState: [true,true], type: 'TYPE01'} as SimulationNode),
      ()=>({guid: guids[2], inputState: [false,true], outputState: [true,false], type: 'TYPE02'} as SimulationNode),
      ()=>({guid: guids[3], inputState: [true,false], outputState: [false,true], type: 'TYPE03'} as SimulationNode),
      ()=>({guid: guids[4], inputState: [true,true], outputState: [false,false], type: 'TYPE04'} as SimulationNode),
      ()=>({guid: guids[5], inputState: [false,false], outputState: [true,true], type: 'TYPE05'} as SimulationNode)
    ]

    const checkDispatch = (id: number, exists: boolean = true) => {
      if(exists) expect(store.state.simulation.nodes[guids[id]]).to.deep.equal(nodeStates[id]())
      else expect(store.state.simulation.nodes[guids[id]]).to.not.deep.equal(nodeStates[id]())
    }
    
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[0]())
    console.log(store.state.simulation.nodes)
    checkDispatch(0)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[1]())
    checkDispatch(1)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[2]())
    checkDispatch(2)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[3]())
    checkDispatch(3)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[4]())
    checkDispatch(4)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[5]())
    checkDispatch(5)

    //Remove 2
    MakeSimulationActions.RemoveNode(store.dispatch, guids[0])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[2])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[2]())
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[2])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[1])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[3])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[4])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4, false)
    checkDispatch(5)
    MakeSimulationActions.RemoveNode(store.dispatch, guids[5])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4, false)
    checkDispatch(5, false)

  })

  it('AddConnection / RemoveConnection', () => {
    const guids = [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4()]
    const connectionStates = [
      ()=>({ guid: guids[0], state: [false,false] } as SimulationConnection),
      ()=>({ guid: guids[1], state: [true,true] } as SimulationConnection),
      ()=>({ guid: guids[2], state: [false,true] } as SimulationConnection),
      ()=>({ guid: guids[3], state: [true,false] } as SimulationConnection),
      ()=>({ guid: guids[4], state: [true,true] } as SimulationConnection),
      ()=>({ guid: guids[5], state: [false,false] } as SimulationConnection)
    ]

    const checkDispatch = (id: number, exists: boolean = true) => {
      if(exists) expect(store.state.simulation.connections[guids[id]]).to.deep.equal(connectionStates[id]())
      else  expect(store.state.simulation.connections[guids[id]]).to.not.deep.equal(connectionStates[id]())
    }
    
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[0]())
    checkDispatch(0)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[1]())
    checkDispatch(1)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[2]())
    checkDispatch(2)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[3]())
    checkDispatch(3)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[4]())
    checkDispatch(4)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[5]())
    checkDispatch(5)

    //Remove 2
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[0])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[2])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[2]())
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[2])
    checkDispatch(0, false)
    checkDispatch(1)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[1])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[3])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[4])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4, false)
    checkDispatch(5)
    MakeSimulationActions.RemoveConnection(store.dispatch, guids[5])
    checkDispatch(0, false)
    checkDispatch(1, false)
    checkDispatch(2, false)
    checkDispatch(3, false)
    checkDispatch(4, false)
    checkDispatch(5, false)

  })

  it.skip('Make Sync Event when connection state changes', () => {
  })

  it.skip('Make Sync Event when node state changes', () => {
  })

  it.skip('Node Gate Logic: NOT', () => {
  })

  it.skip('Node Gate Logic: AND', () => {
  })

  it.skip('Node Gate Logic: OR', () => {
  })

  it.skip('Node Gate Logic: NAND', () => {
  })

  it.skip('Node Gate Logic: PinIn', () => {
  })

  it.skip('Node Gate Logic: PinOut', () => {
  })
})
