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
            store = new Store(storeDef())
            store.replaceState({ 
                "version":"1.0.0",
                "commands":{ 
                   "historyCount":20,
                   "history":[],
                   "redo":[]
                },
                "notification":{
                  "notifications": []
                },
                "flows":{ 
                   "connectedToBackend":false,
                   "nodes":{ 
                      "b990a45f-7416-4fa3-b19a-08102ec599c4":{ 
                         "type":"AND",
                         "args":{ 
                            "guid":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                            "x":14,
                            "y":10
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca":{ 
                         "type":"PinOut",
                         "args":{ 
                            "pinName":"A",
                            "guid":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "x":23,
                            "y":8
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "x":3,
                            "y":6
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "e1a2381b-35d0-4155-8659-a53e88e0600e":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                            "x":3,
                            "y":15
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      }
                   },
                   "flows":{ 
                      "4bc08543-15b3-4b5a-bfaf-fda8396181da":{ 
                         "guid":"4bc08543-15b3-4b5a-bfaf-fda8396181da",
                         "title":"",
                         "isProxy":false,
                         "filename":"",
                         "error":false,
                         "changed":true,
                         "inputs":[ 
             
                         ],
                         "outputs":[ 
             
                         ],
                         "nodes":[ 
                            "b990a45f-7416-4fa3-b19a-08102ec599c4",
                            "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "e1a2381b-35d0-4155-8659-a53e88e0600e"
                         ],
                         "connections":[ 
                            "537da82c-a67e-4993-ad25-4bf65059b15d",
                            "65d26568-d1fd-45a5-8205-c392b7e14165",
                            "3e6cd641-ea9c-48ca-8229-364433797152"
                         ]
                      }
                   },
                   "connections":{ 
                      "537da82c-a67e-4993-ad25-4bf65059b15d":{ 
                         "guid":"537da82c-a67e-4993-ad25-4bf65059b15d",
                         "fromID":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                         "fromPort":0,
                         "toID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "toPort":0,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      },
                      "65d26568-d1fd-45a5-8205-c392b7e14165":{ 
                         "guid":"65d26568-d1fd-45a5-8205-c392b7e14165",
                         "fromID":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                         "fromPort":0,
                         "toID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "toPort":1,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      },
                      "3e6cd641-ea9c-48ca-8229-364433797152":{ 
                         "guid":"3e6cd641-ea9c-48ca-8229-364433797152",
                         "fromID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "fromPort":0,
                         "toID":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                         "toPort":0,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      }
                   }
                },
                "selection":{ 
                   "selected":[ 
                      "537da82c-a67e-4993-ad25-4bf65059b15d",
                      "3e6cd641-ea9c-48ca-8229-364433797152",
                      "b990a45f-7416-4fa3-b19a-08102ec599c4",
                      "e1a2381b-35d0-4155-8659-a53e88e0600e",
                      "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca"
                   ],
                   "draggingNode":false,
                   "draggingConnection":false,
                   "draggingConnectionFromOutput":false,
                   "draggingConnectionNode":"",
                   "draggingConnectionNodePort":0,
                   "dragOffsetGridX":0,
                   "dragOffsetGridY":0,
                   "dragOffsetX":0,
                   "dragOffsetY":0,
                   "mouseStartX":0,
                   "mouseStartY":0
                },
                "workspace":{ 
                   "size":{ 
                      "height":250,
                      "width":250
                   },
                   "grid":{ 
                      "height":20,
                      "width":20
                   },
                   "prefrences":{ 
                      "shiftMove":5
                   },
                   "editor":{ 
                      "selectedFlow":0,
                      "loadedFlows":[ 
                         "4bc08543-15b3-4b5a-bfaf-fda8396181da"
                      ]
                   }
                }
             } as RootState)

            // Setup Default Flow
            // const guid = uuid.v4()
            // const filename = uuid.v4()
            // const title = uuid.v4()
            // flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }

            // store.dispatch('flows/createFlow', flow)
          
        }
      
        beforeEach(prep)

        it('Do/Undo', () => {
            let cmd = new CMDRemoveNode("b990a45f-7416-4fa3-b19a-08102ec599c4") //Was e1a2381b-35d0-4155-8659-a53e88e0600e
            //console.log(JSON.stringify(store.state))
            cmd.exe(store.dispatch, store.state)
            //console.log(JSON.stringify(store.state))
            expect(store.state).deep.equal({ 
                "version":"1.0.0",
                "commands":{ 
                   "historyCount":20,
                   "history":[
                   ],
                   "redo":[ 
                   ]
                },
                "notification":{
                  "notifications": []
                },
                "flows":{ 
                   "connectedToBackend":false,
                   "nodes":{ 
                      "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca":{ 
                         "type":"PinOut",
                         "args":{ 
                            "pinName":"A",
                            "guid":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "x":23,
                            "y":8
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "x":3,
                            "y":6
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "e1a2381b-35d0-4155-8659-a53e88e0600e":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                            "x":3,
                            "y":15
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      }
                   },
                   "flows":{ 
                      "4bc08543-15b3-4b5a-bfaf-fda8396181da":{ 
                         "guid":"4bc08543-15b3-4b5a-bfaf-fda8396181da",
                         "title":"",
                         "isProxy":false,
                         "filename":"",
                         "error":false,
                         "changed":true,
                         "inputs":[ 
             
                         ],
                         "outputs":[ 
             
                         ],
                         "nodes":[ 
                            "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "e1a2381b-35d0-4155-8659-a53e88e0600e"
                         ],
                         "connections":[ 
                         ]
                      }
                   },
                   "connections":{ 
                   }
                },
                "selection":{ 
                   "selected":[ 
                        "e1a2381b-35d0-4155-8659-a53e88e0600e",
                        "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca"
                    ],
                   "draggingNode":false,
                   "draggingConnection":false,
                   "draggingConnectionFromOutput":false,
                   "draggingConnectionNode":"",
                   "draggingConnectionNodePort":0,
                   "dragOffsetGridX":0,
                   "dragOffsetGridY":0,
                   "dragOffsetX":0,
                   "dragOffsetY":0,
                   "mouseStartX":0,
                   "mouseStartY":0
                },
                "workspace":{ 
                   "size":{ 
                      "height":250,
                      "width":250
                   },
                   "grid":{ 
                      "height":20,
                      "width":20
                   },
                   "prefrences":{ 
                      "shiftMove":5
                   },
                   "editor":{ 
                      "selectedFlow":0,
                      "loadedFlows":[ 
                         "4bc08543-15b3-4b5a-bfaf-fda8396181da"
                      ]
                   }
                }
             })

             cmd.undo(store.dispatch, store.state)

             expect(store.state).deep.equal({ 
                "version":"1.0.0",
                "commands":{ 
                   "historyCount":20,
                   "history":[],
                   "redo":[]
                },
                "notification":{
                  "notifications": []
                },
                "flows":{ 
                   "connectedToBackend":false,
                   "nodes":{ 
                      "b990a45f-7416-4fa3-b19a-08102ec599c4":{ 
                         "type":"AND",
                         "args":{ 
                            "guid":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                            "x":14,
                            "y":10
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca":{ 
                         "type":"PinOut",
                         "args":{ 
                            "pinName":"A",
                            "guid":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "x":23,
                            "y":8
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "x":3,
                            "y":6
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "e1a2381b-35d0-4155-8659-a53e88e0600e":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                            "x":3,
                            "y":15
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      }
                   },
                   "flows":{ 
                      "4bc08543-15b3-4b5a-bfaf-fda8396181da":{ 
                         "guid":"4bc08543-15b3-4b5a-bfaf-fda8396181da",
                         "title":"",
                         "isProxy":false,
                         "filename":"",
                         "error":false,
                         "changed":true,
                         "inputs":[ 
             
                         ],
                         "outputs":[ 
             
                         ],
                         "nodes":[ 
                            "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "e1a2381b-35d0-4155-8659-a53e88e0600e",
                            "b990a45f-7416-4fa3-b19a-08102ec599c4"
                         ],
                         "connections":[ 
                            "537da82c-a67e-4993-ad25-4bf65059b15d",
                            "65d26568-d1fd-45a5-8205-c392b7e14165",
                            "3e6cd641-ea9c-48ca-8229-364433797152"
                         ]
                      }
                   },
                   "connections":{ 
                      "537da82c-a67e-4993-ad25-4bf65059b15d":{ 
                         "guid":"537da82c-a67e-4993-ad25-4bf65059b15d",
                         "fromID":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                         "fromPort":0,
                         "toID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "toPort":0,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      },
                      "65d26568-d1fd-45a5-8205-c392b7e14165":{ 
                         "guid":"65d26568-d1fd-45a5-8205-c392b7e14165",
                         "fromID":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                         "fromPort":0,
                         "toID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "toPort":1,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      },
                      "3e6cd641-ea9c-48ca-8229-364433797152":{ 
                         "guid":"3e6cd641-ea9c-48ca-8229-364433797152",
                         "fromID":"b990a45f-7416-4fa3-b19a-08102ec599c4",
                         "fromPort":0,
                         "toID":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                         "toPort":0,
                         "selected":false,
                         "state":[ 
                            false
                         ]
                      }
                   }
                },
                "selection":{ 
                   "selected":[ 
                       "e1a2381b-35d0-4155-8659-a53e88e0600e",
                       "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                       "b990a45f-7416-4fa3-b19a-08102ec599c4",
                       "537da82c-a67e-4993-ad25-4bf65059b15d",
                       "3e6cd641-ea9c-48ca-8229-364433797152"
                   ],
                   "draggingNode":false,
                   "draggingConnection":false,
                   "draggingConnectionFromOutput":false,
                   "draggingConnectionNode":"",
                   "draggingConnectionNodePort":0,
                   "dragOffsetGridX":0,
                   "dragOffsetGridY":0,
                   "dragOffsetX":0,
                   "dragOffsetY":0,
                   "mouseStartX":0,
                   "mouseStartY":0
                },
                "workspace":{ 
                   "size":{ 
                      "height":250,
                      "width":250
                   },
                   "grid":{ 
                      "height":20,
                      "width":20
                   },
                   "prefrences":{ 
                      "shiftMove":5
                   },
                   "editor":{ 
                      "selectedFlow":0,
                      "loadedFlows":[ 
                         "4bc08543-15b3-4b5a-bfaf-fda8396181da"
                      ]
                   }
                }
             })
            cmd.exe(store.dispatch, store.state)
            expect(store.state).deep.equal({ 
                "version":"1.0.0",
                "commands":{ 
                   "historyCount":20,
                   "history":[
                   ],
                   "redo":[ 
                   ]
                },
                "notification":{
                  "notifications": []
                },
                "flows":{ 
                   "connectedToBackend":false,
                   "nodes":{ 
                      "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca":{ 
                         "type":"PinOut",
                         "args":{ 
                            "pinName":"A",
                            "guid":"ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "x":23,
                            "y":8
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "x":3,
                            "y":6
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      },
                      "e1a2381b-35d0-4155-8659-a53e88e0600e":{ 
                         "type":"PinIn",
                         "args":{ 
                            "pinName":"A",
                            "guid":"e1a2381b-35d0-4155-8659-a53e88e0600e",
                            "x":3,
                            "y":15
                         },
                         "error":false,
                         "changed":false,
                         "selected":false,
                         "inputState":[ 
             
                         ],
                         "outputState":[ 
             
                         ]
                      }
                   },
                   "flows":{ 
                      "4bc08543-15b3-4b5a-bfaf-fda8396181da":{ 
                         "guid":"4bc08543-15b3-4b5a-bfaf-fda8396181da",
                         "title":"",
                         "isProxy":false,
                         "filename":"",
                         "error":false,
                         "changed":true,
                         "inputs":[ 
             
                         ],
                         "outputs":[ 
             
                         ],
                         "nodes":[ 
                            "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca",
                            "4bf2ced6-3665-42ce-a2c5-e96f82b9cdf4",
                            "e1a2381b-35d0-4155-8659-a53e88e0600e"
                         ],
                         "connections":[ 
                         ]
                      }
                   },
                   "connections":{ 
                   }
                },
                "selection":{ 
                   "selected":[ 
                        "e1a2381b-35d0-4155-8659-a53e88e0600e",
                        "ba872058-b9fe-4aa1-87ce-f3d4cc8832ca"
                    ],
                   "draggingNode":false,
                   "draggingConnection":false,
                   "draggingConnectionFromOutput":false,
                   "draggingConnectionNode":"",
                   "draggingConnectionNodePort":0,
                   "dragOffsetGridX":0,
                   "dragOffsetGridY":0,
                   "dragOffsetX":0,
                   "dragOffsetY":0,
                   "mouseStartX":0,
                   "mouseStartY":0
                },
                "workspace":{ 
                   "size":{ 
                      "height":250,
                      "width":250
                   },
                   "grid":{ 
                      "height":20,
                      "width":20
                   },
                   "prefrences":{ 
                      "shiftMove":5
                   },
                   "editor":{ 
                      "selectedFlow":0,
                      "loadedFlows":[ 
                         "4bc08543-15b3-4b5a-bfaf-fda8396181da"
                      ]
                   }
                }
             })
        })
        it.skip('clone')
        it.skip('canMerge')
        it.skip('merge')
      })
}