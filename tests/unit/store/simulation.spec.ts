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
      ()=>({guid: guids[0], inputState: [false,false], outputState: [false,false], outputGuids: [null], type: 'TYPE00'} as SimulationNode),
      ()=>({guid: guids[1], inputState: [true,true], outputState: [true,true], outputGuids: [null], type: 'TYPE01'} as SimulationNode),
      ()=>({guid: guids[2], inputState: [false,true], outputState: [true,false], outputGuids: [null], type: 'TYPE02'} as SimulationNode),
      ()=>({guid: guids[3], inputState: [true,false], outputState: [false,true], outputGuids: [null], type: 'TYPE03'} as SimulationNode),
      ()=>({guid: guids[4], inputState: [true,true], outputState: [false,false], outputGuids: [null], type: 'TYPE04'} as SimulationNode),
      ()=>({guid: guids[5], inputState: [false,false], outputState: [true,true], outputGuids: [null], type: 'TYPE05'} as SimulationNode)
    ]

    const checkDispatch = (id: number, exists: boolean = true) => {
      if(exists) expect(store.state.simulation.nodes[guids[id]]).to.deep.equal(nodeStates[id]())
      else expect(store.state.simulation.nodes[guids[id]]).to.not.deep.equal(nodeStates[id]())
    }
    
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[0]())
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

  it('Action: Connection Guid set', () => {
    const guids = [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4()]
    
    const nodeStates = [
      (outGUIDs: string|null) => ({guid: guids[0], inputState: [], outputState: [false], type: 'PIN_IN', outputGuids: [outGUIDs]} as SimulationNode),
      (outGUIDs: string|null) => ({guid: guids[1], inputState: [], outputState: [false], type: 'PIN_IN', outputGuids: [outGUIDs]} as SimulationNode),
      (outGUIDs: string|null) => ({guid: guids[2], inputState: [false,false], outputState: [false], type: 'AND', outputGuids: [outGUIDs]} as SimulationNode)
    ]

    const connectionStates = [
      ()=>({ guid: guids[3], state: [false,false], from: guids[0], fromPin: 0, to: guids[2], toPin: 0} as SimulationConnection),
      ()=>({ guid: guids[4], state: [true,true], from: guids[1], fromPin: 0, to: guids[2], toPin: 1} as SimulationConnection),
    ]

    const checkDispatchNodes = (id: number, exists: boolean = true, outGUIDs: string|null = null) => {
      if(exists) expect(store.state.simulation.nodes[guids[id]]).to.deep.equal(nodeStates[id](outGUIDs))
      else expect(store.state.simulation.nodes[guids[id]]).to.not.deep.equal(nodeStates[id](outGUIDs))
    }

    const checkDispatchConnections = (id: number, exists: boolean = true) => {
      if(exists) expect(store.state.simulation.connections[guids[nodeStates.length + id]]).to.deep.equal(connectionStates[id]())
      else  expect(store.state.simulation.connections[guids[nodeStates.length + id]]).to.not.deep.equal(connectionStates[id]())
    }

    MakeSimulationActions.AddNode(store.dispatch, nodeStates[0](null))
    checkDispatchNodes(0, true, null)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[1](null))
    checkDispatchNodes(1, true, null)
    MakeSimulationActions.AddNode(store.dispatch, nodeStates[2](null))
    checkDispatchNodes(2, true, null)
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[0]())
    
    checkDispatchConnections(0)
    checkDispatchNodes(0, true, guids[3])
    
    MakeSimulationActions.AddConnection(store.dispatch, connectionStates[1]())
    checkDispatchConnections(1)
    checkDispatchNodes(1, true, guids[4])
    
  })

  it('Action: Set Node State', async () => {
    const guids = [uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4(),uuid.v4()]
    
    const nodeStates = [
      (outGUIDs: string|null) => ({guid: guids[0], inputState: [], outputState: [false], type: 'PIN_IN', outputGuids: [outGUIDs]} as SimulationNode),
      (outGUIDs: string|null) => ({guid: guids[1], inputState: [], outputState: [false], type: 'PIN_IN', outputGuids: [outGUIDs]} as SimulationNode),
      (outGUIDs: string|null) => ({guid: guids[2], inputState: [false,false], outputState: [false], type: 'AND', outputGuids: [outGUIDs]} as SimulationNode)
    ]

    const connectionStates = [
      ()=>({ guid: guids[3], state: [false], from: guids[0], fromPin: 0, to: guids[2], toPin: 0} as SimulationConnection),
      ()=>({ guid: guids[4], state: [false], from: guids[1], fromPin: 0, to: guids[2], toPin: 1} as SimulationConnection),
    ]

    const checkDispatchNodes = (id: number, exists: boolean = true, outGUIDs: string|null = null) => {
      if(exists) expect(store.state.simulation.nodes[guids[id]]).to.deep.equal(nodeStates[id](outGUIDs))
      else expect(store.state.simulation.nodes[guids[id]]).to.not.deep.equal(nodeStates[id](outGUIDs))
    }

    const checkDispatchConnections = (id: number, exists: boolean = true) => {
      if(exists) expect(store.state.simulation.connections[guids[nodeStates.length + id]]).to.deep.equal(connectionStates[id]())
      else  expect(store.state.simulation.connections[guids[nodeStates.length + id]]).to.not.deep.equal(connectionStates[id]())
    }

    await MakeSimulationActions.AddNode(store.dispatch, nodeStates[0](null))
    await MakeSimulationActions.AddNode(store.dispatch, nodeStates[1](null))
    await MakeSimulationActions.AddNode(store.dispatch, nodeStates[2](null))
    await MakeSimulationActions.AddConnection(store.dispatch, connectionStates[0]())
    await MakeSimulationActions.AddConnection(store.dispatch, connectionStates[1]())
    checkDispatchNodes(0, true, guids[3])
    checkDispatchNodes(1, true, guids[4])
    checkDispatchNodes(2, true, null)
    checkDispatchConnections(0)
    checkDispatchConnections(1)

    await MakeSimulationActions.SetNodeState(store.dispatch, guids[0], true, 0, true)
    expect(store.state.simulation.connections[guids[3]].state[0]).to.be.true
    expect(store.state.simulation.connections[guids[4]].state[0]).to.be.false
    expect(store.state.simulation.nodes[guids[2]].inputState[0]).to.be.true
    expect(store.state.simulation.nodes[guids[2]].inputState[1]).to.be.false

    await MakeSimulationActions.SetNodeState(store.dispatch, guids[1], true, 0, true)
    expect(store.state.simulation.connections[guids[3]].state[0]).to.be.true
    expect(store.state.simulation.connections[guids[4]].state[0]).to.be.true
    expect(store.state.simulation.nodes[guids[2]].inputState[0]).to.be.true
    expect(store.state.simulation.nodes[guids[2]].inputState[1]).to.be.true
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

  it.skip('Node Gate Logic: PIN', () => {
  })

  it.skip('Node Gate Logic: PinOut', () => {
  })
})
