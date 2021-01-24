import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store: Simulation', () => {
  //let getters
  let store: Store<RootState>

  beforeEach(() => {
    store = new Store(storeDef())
    store.replaceState(storeDef().state as RootState)
  })

  it('AddNode', () => {
    // expect(store.state.selection).to.deep.equal({
    //     selected: [],
    //     draggingNode: false,
    //     draggingConnection: false,
    //     draggingConnectionFromOutput: false,
    //     draggingConnectionNode: '',
    //     draggingConnectionNodePort: -1,
    //     dragOffsetGridX: 0,
    //     dragOffsetGridY: 0,
    //     dragOffsetX: 0,
    //     dragOffsetY: 0,
    //     mouseStartX: 0,
    //     mouseStartY: 0
    // })
  })

  it('RemoveNode', () => {
  })

  it('AddConnection', () => {
  })

  it('RemoveConnection', () => {
  })

  it('Make Sync Event when connection state changes', () => {
  })

  it('Make Sync Event when node state changes', () => {
  })

  it('Node Gate Logic: NOT', () => {
  })

  it('Node Gate Logic: AND', () => {
  })

  it('Node Gate Logic: OR', () => {
  })

  it('Node Gate Logic: NAND', () => {
  })

  it('Node Gate Logic: PinIn', () => {
  })

  it('Node Gate Logic: PinOut', () => {
  })
})
