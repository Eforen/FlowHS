import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'
import CMDAddNode from '@/store/commands/cmds/CMDAddNode'
import { Node, Flow, Connection } from '@/store/flows/types'
import uuid from 'uuid'
import { IPinArgs } from '@/nodes/types/Pins'
import { IAndArgs } from '@/nodes/types/AND'
import CMDConnectNodes from '@/store/commands/cmds/CMDConnectNodes'

const localVue = createLocalVue()
localVue.use(Vuex)

export const tests_CMDConnectNodes = () => {
    describe('CMD: CMDConnectNodes', () => {
        let store: Store<RootState>
        let flow: Flow
      
        beforeEach(() => {
            //console.log(storeDef())
            //localVue = createLocalVue()
            //localVue.use(Vuex)
            store = new Store(storeDef())
            store.replaceState(storeDef().state as RootState)
            //console.log(store.state)
            //console.log(storeDef())

            // Setup Default Flow
            const guid = "b8c6ff64-8097-468b-af51-5582c214a473"
            const filename = ""
            const title = ""
            flow = {guid, isProxy: false, filename, title, error: false, changed: true, connections:[], inputs: [], outputs: [], nodes: [] }

            store.dispatch('flows/createFlow', flow)
          
        })

        it('Do/Undo', () => {

            const target = {
                "connectedToBackend": false,
                "nodes": {
                    "7d20d645-2115-4936-8bf0-4e697505be2a": {
                        "type": "PinIn",
                        "args": {
                            "guid": "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "x": 2,
                            "y": 7,
                            "pinName": "A"
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    },
                    "d159624c-cf1c-4192-a4cf-8d071c5eaa7e": {
                        "type": "AND",
                        "args": {
                            "guid": "d159624c-cf1c-4192-a4cf-8d071c5eaa7e",
                            "x": 10,
                            "y": 20
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    }
                },
                "flows": {
                    "b8c6ff64-8097-468b-af51-5582c214a473": {
                        "guid": "b8c6ff64-8097-468b-af51-5582c214a473",
                        "title": "",
                        "isProxy": false,
                        "filename": "",
                        "error": false,
                        "changed": true,
                        "inputs": [],
                        "outputs": [],
                        "nodes": [
                            "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "d159624c-cf1c-4192-a4cf-8d071c5eaa7e"
                        ],
                        "connections": [
                            "a0a64a9c-6603-4476-a5f1-2f1373c79962"
                        ]
                    }
                },
                "connections": {
                    "a0a64a9c-6603-4476-a5f1-2f1373c79962": {
                        "guid": "a0a64a9c-6603-4476-a5f1-2f1373c79962",
                        "fromID": "7d20d645-2115-4936-8bf0-4e697505be2a",
                        "fromPort": 0,
                        "toID": "d159624c-cf1c-4192-a4cf-8d071c5eaa7e",
                        "toPort": 2,
                        "selected": false,
                        "state": [
                            false
                        ]
                    }
                }
            }
            const target2 = {
                "connectedToBackend": false,
                "nodes": {
                    "7d20d645-2115-4936-8bf0-4e697505be2a": {
                        "type": "PinIn",
                        "args": {
                            "guid": "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "x": 2,
                            "y": 7,
                            "pinName": "A"
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    },
                    "d159624c-cf1c-4192-a4cf-8d071c5eaa7e": {
                        "type": "AND",
                        "args": {
                            "guid": "d159624c-cf1c-4192-a4cf-8d071c5eaa7e",
                            "x": 10,
                            "y": 20
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    }
                },
                "flows": {
                    "b8c6ff64-8097-468b-af51-5582c214a473": {
                        "guid": "b8c6ff64-8097-468b-af51-5582c214a473",
                        "title": "",
                        "isProxy": false,
                        "filename": "",
                        "error": false,
                        "changed": true,
                        "inputs": [],
                        "outputs": [],
                        "nodes": [
                            "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "d159624c-cf1c-4192-a4cf-8d071c5eaa7e"
                        ],
                        "connections": [
                            "a0a64a9c-6603-4476-a5f1-2f1373c79962"
                        ]
                    }
                },
                "connections": {
                    "a0a64a9c-6603-4476-a5f1-2f1373c79962": {
                        "guid": "a0a64a9c-6603-4476-a5f1-2f1373c79962",
                        "fromID": "7d20d645-2115-4936-8bf0-4e697505be2a",
                        "fromPort": 0,
                        "toID": "d159624c-cf1c-4192-a4cf-8d071c5eaa7e",
                        "toPort": 0,
                        "selected": false,
                        "state": [
                            false
                        ]
                    }
                }
            }

            
            const targetNoCon = {
                "connectedToBackend": false,
                "nodes": {
                    "7d20d645-2115-4936-8bf0-4e697505be2a": {
                        "type": "PinIn",
                        "args": {
                            "guid": "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "x": 2,
                            "y": 7,
                            "pinName": "A"
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    },
                    "d159624c-cf1c-4192-a4cf-8d071c5eaa7e": {
                        "type": "AND",
                        "args": {
                            "guid": "d159624c-cf1c-4192-a4cf-8d071c5eaa7e",
                            "x": 10,
                            "y": 20
                        },
                        "error": false,
                        "changed": false,
                        "selected": false,
                        "inputState": [],
                        "outputState": []
                    }
                },
                "flows": {
                    "b8c6ff64-8097-468b-af51-5582c214a473": {
                        "guid": "b8c6ff64-8097-468b-af51-5582c214a473",
                        "title": "",
                        "isProxy": false,
                        "filename": "",
                        "error": false,
                        "changed": true,
                        "inputs": [],
                        "outputs": [],
                        "nodes": [
                            "7d20d645-2115-4936-8bf0-4e697505be2a",
                            "d159624c-cf1c-4192-a4cf-8d071c5eaa7e"
                        ],
                        "connections": []
                    }
                },
                "connections": {
                }
            }

            const debug1: Node = { type: 'PinIn', args: {guid: "7d20d645-2115-4936-8bf0-4e697505be2a", x: 2, y: 7, pinName:'A'} as IPinArgs, error: false, changed: false, selected: false, inputState: [], outputState: []}
            const debug2: Node = { type: 'AND', args: {guid: "d159624c-cf1c-4192-a4cf-8d071c5eaa7e", x: 10, y: 20} as IAndArgs, error: false, changed: false, selected: false, inputState: [], outputState: []}
            const con: Connection = {guid:"a0a64a9c-6603-4476-a5f1-2f1373c79962", fromID: debug1.args.guid, toID: debug2.args.guid, fromPort: 0, toPort: 2, state: [false], selected: false}
            
            new CMDAddNode(debug1, "b8c6ff64-8097-468b-af51-5582c214a473").exe(store.dispatch, store.state)
            new CMDAddNode(debug2, "b8c6ff64-8097-468b-af51-5582c214a473").exe(store.dispatch, store.state)
            
            expect(store.state.flows).to.deep.equal(targetNoCon)

            let conN = new CMDConnectNodes("a0a64a9c-6603-4476-a5f1-2f1373c79962", debug1.args.guid, 0, debug2.args.guid, 2)
            conN.exe(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(target)

            conN.undo(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(targetNoCon)

            conN = new CMDConnectNodes("a0a64a9c-6603-4476-a5f1-2f1373c79962", debug1.args.guid, -1, debug2.args.guid, 2)
            conN.exe(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(target)

            conN.undo(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(targetNoCon)

            conN = new CMDConnectNodes("a0a64a9c-6603-4476-a5f1-2f1373c79962", debug1.args.guid, 0, debug2.args.guid, -1)
            conN.exe(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(target2)

            conN.undo(store.dispatch, store.state)

            expect(store.state.flows).to.deep.equal(targetNoCon)
        })
        it.skip('clone')
        it.skip('canMerge')
        it.skip('merge')
      })
}