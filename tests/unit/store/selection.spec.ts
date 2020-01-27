import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store: Selection', () => {
  //let getters
  let store: Store<RootState>

  beforeEach(() => {
    store = new Store(storeDef())
    store.replaceState(storeDef().state as RootState)
  })

  it('Test Defaults', () => {
    // const msg = 'Welcome'
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    // expect(wrapper.text()).to.include(msg)
    expect(store.state.selection).to.deep.equal({
        selected: [],
        draggingNode: false,
        draggingConnection: false,
        draggingConnectionFromOutput: false,
        draggingConnectionNode: '',
        draggingConnectionNodePort: -1,
        dragOffsetGridX: 0,
        dragOffsetGridY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        mouseStartX: 0,
        mouseStartY: 0
    })
  })
})
