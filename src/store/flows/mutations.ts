// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { FlowsState, Node, Flow, Connection, ConnectionDictionary } from './types';
import { ObjectForEach, ObjectFilter } from '@/util/ObjectDictionary';
import { flows } from '.';

export const mutations: MutationTree<FlowsState> = {
    // profileLoaded(state, payload: User) {
    //     state.error = false;
    //     state.user = payload;
    // },
    // profileError(state) {
    //     state.error = true;
    //     state.user = undefined;
    // }
    setFlow(state, payload: Flow){
        Vue.set(state.flows, payload.guid, payload)
    },
    setNode(state, payload: Node){
        Vue.set(state.nodes, payload.guid, payload)
    },
    removeNode(state, nodeID: string){
        if(state.nodes[nodeID] == undefined) return
        
        state.nodes = ObjectFilter(state.nodes, (node: Node, key) => key != nodeID)

        let newConnections: ConnectionDictionary = {}
        let removedConnections: string[]
        let changed = false

        ObjectForEach(state.connections, (key, con: Connection) => {
            if(con.fromID == nodeID || con.toID == nodeID){
                changed = true
                removedConnections.push(con.guid)
            } else {
                newConnections[con.guid] = con
            }
        })
        if(changed) state.connections = newConnections
        
        ObjectForEach(state.flows, (key, flow: Flow) => {
            const newNodes = flow.nodes.filter(guid => guid != nodeID)
            if(newNodes.length != flow.nodes.length){
                flow.nodes = newNodes

                const newCons = flow.connections.filter(guid => removedConnections.includes(guid) == false)
                if(newCons.length != flow.connections.length){
                    flow.connections = newCons
                }
            }
        })
    },
    setNodePos(state, {node, x, y}: {node:string, x: number, y:number}){
        Vue.set(state.nodes, node, {...state.nodes[node], args:{ ...state.nodes[node].args, x, y }})
    },
    addNodeToFlow(state, payload: {flow: string, node: string}){
        if(state.flows[payload.flow].nodes.indexOf(payload.node) == -1){
            Vue.set(state.flows, payload.flow, 
                {...state.flows[payload.flow], 
                    nodes: [...state.flows[payload.flow].nodes, payload.node]
                }
            )
        }
    },
    addConToFlow(state, payload: {flow: string, connection: string}){
        if(state.flows[payload.flow].connections.indexOf(payload.connection) == -1){
            Vue.set(state.flows, payload.flow, 
                {...state.flows[payload.flow], 
                    connections: [...state.flows[payload.flow].connections, payload.connection]
                }
            )
        }
    }
};