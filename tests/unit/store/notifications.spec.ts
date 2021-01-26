import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store: Notification', () => {
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
    expect(typeof(store.state.notification)).to.equal('object')
    //expect(typeof(store.state.notification.notifications)).to.equal('array')
    expect(store.state.notification).to.deep.equal({
      notifications: []
    })
  })
  
  it('add new notification', ()=>{
    store.dispatch('notification/createNotificaion', {text: "Test 123", closable:true, border:"left", icon:"mdi-undo"})
    
    expect(store.state.notification.notifications[0].id).to.contain("-")
    expect(store.state.notification.notifications[0].text).to.equal("Test 123")
    expect(store.state.notification.notifications[0].closable).to.be.true
    expect(store.state.notification.notifications[0].border).to.equal("left")
    expect(store.state.notification.notifications[0].icon).to.equal("mdi-undo")

    store.dispatch('notification/createNotificaion', {text: "Test 123", closable:true, border:"left", icon:"mdi-undo"})
    
    expect(store.state.notification.notifications[0].id).to.contain("-")
    expect(store.state.notification.notifications[0].text).to.equal("Test 123")
    expect(store.state.notification.notifications[0].closable).to.be.true
    expect(store.state.notification.notifications[0].border).to.equal("left")
    expect(store.state.notification.notifications[0].icon).to.equal("mdi-undo")

    expect(store.state.notification.notifications[1].id).to.contain("-")
    expect(store.state.notification.notifications[1].text).to.equal("Test 123")
    expect(store.state.notification.notifications[1].closable).to.be.true
    expect(store.state.notification.notifications[1].border).to.equal("left")
    expect(store.state.notification.notifications[1].icon).to.equal("mdi-undo")
    
    expect(store.state.notification.notifications[0].id).to.not.equal(store.state.notification.notifications[1].id)
  })
  
  it('timeout notification', async ()=>{
    store.dispatch('notification/createNotificaion', {text: "Test 123", closable:true, timeout:1000, border:"left", icon:"mdi-redo"})

    expect(store.state.notification.notifications.length).to.equal(1, 'Notification not set')

    await new Promise<void>(resolve=>{
      setTimeout(()=>{expect(store.state.notification.notifications.length).to.equal(1, 'Notification removed too early')}, 900)
      setTimeout(()=>{expect(store.state.notification.notifications.length).to.equal(0, 'Notification was not removed'); resolve()}, 1100)
    })
    //TODO: wait for a spesific random time
  })
  
  it('remove notification action', ()=>{
    store.dispatch('notification/createNotificaion', {text: "Test 123", closable:true, border:"left", icon:"mdi-redo"})
    
    expect(store.state.notification.notifications[0].id).to.contain("-")
    store.dispatch('notification/removeNotificaion', store.state.notification.notifications[0].id)

    expect(store.state.notification.notifications.length).to.equal(0)
  })
})
