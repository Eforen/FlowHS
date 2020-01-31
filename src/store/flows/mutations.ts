// profile/mutations.ts
import Vue from 'vue';
import { MutationTree, Mutation } from 'vuex';
import { FlowsState, Node, Flow, Connection, ConnectionDictionary } from './types';
import { ObjectForEach, ObjectFilter, ObjectFind } from '@/util/ObjectDictionary';
import { flows } from '.';

export const setFlow = (state: FlowsState, payload: Flow)=>{
    Vue.set(state.flows, payload.guid, payload)
}
export const setNode = (state: FlowsState, payload: Node) => {
    Vue.set(state.nodes, payload.args.guid, payload)
}
export const removeNode: Mutation<FlowsState> = (state: FlowsState, nodeID: string) => {
    // If node does not exist bail out
    if(state.nodes[nodeID] == undefined) return
    
    
    //console.log("RemoveNodes")
    //console.log(state.nodes)
    // filter out this node from nodes list
    state.nodes = ObjectFilter(state.nodes, (node: Node, key) => {
        //console.log(`${key} != ${nodeID} == ${key != nodeID}`)
        return key != nodeID
    })

    //console.log(state.nodes)

    // Setup some vars
    let newConnections: ConnectionDictionary = {}
    let removedConnections: string[] = []
    let changed = false

    // Get all connections that connect to this node and remove them
    ObjectForEach(state.connections, (key, con: Connection) => {
        if(con.fromID == nodeID || con.toID == nodeID){
            changed = true
            removedConnections.push(con.guid)
        } else {
            newConnections[con.guid] = con
        }
    })
    if(changed) state.connections = newConnections
    
    // Get remove this node from any flows that contain it
    ObjectForEach(state.flows, (key, flow: Flow) => {
        // Get filtered list of nodes for Flow
        const newNodes = flow.nodes.filter(guid => guid != nodeID)
        // Check that the list changed
        if(newNodes.length != flow.nodes.length){
            flow.nodes = newNodes

            // Remove the connections that were removed if they exist in this flow
            const newCons = flow.connections.filter(guid => removedConnections.includes(guid) == false)
            if(newCons.length != flow.connections.length){
                flow.connections = newCons
            }
        }
    })
}
export const setNodePos = (state: FlowsState, {node, x, y}: {node:string, x: number, y:number}) => {
    Vue.set(state.nodes, node, {...state.nodes[node], args:{ ...state.nodes[node].args, x, y }})
}
export const addNodeToFlow = (state: FlowsState, payload: {flow: string, node: string}) => {
    if(state.flows[payload.flow]){
        if(state.flows[payload.flow].nodes.indexOf(payload.node) == -1){
            Vue.set(state.flows, payload.flow, 
                {...state.flows[payload.flow], 
                    nodes: [...state.flows[payload.flow].nodes, payload.node]
                }
            )
        }
    } else throw new Error("Flow Not Set")
}
export const addConToFlow = (state: FlowsState, payload: {flow: string, connection: string}) => {
    if(state.flows[payload.flow].connections.indexOf(payload.connection) == -1){
        Vue.set(state.flows, payload.flow, 
            {...state.flows[payload.flow], 
                connections: [...state.flows[payload.flow].connections, payload.connection]
            }
        )
    }
}
export const setConnection = (state: FlowsState, payload: {conGUID: string, fromID: string, fromPort: number, toID: string, toPort: number}) => {
    const {conGUID, fromID, fromPort, toID, toPort} = payload
    const from = state.nodes[fromID]
    const to = state.nodes[toID]
    const fromFlow = ObjectFind(state.flows, (flow: Flow) => flow.nodes.includes(fromID))
    const toFlow = ObjectFind(state.flows, (flow: Flow) => flow.nodes.includes(toID))
    
    
    if(to && from && toFlow && fromFlow && toFlow.key == fromFlow.key){
        // Create Connection Obj
        const connection: Connection = {guid: conGUID, fromID, fromPort, toID, toPort, selected: false, state: [false]}
        // Add Connection to the list
        Vue.set(state.connections, conGUID, connection)

        // Add Connection to flows
        addConToFlow(state, {flow: toFlow.key, connection: conGUID})
        // TODO: Add to node connection cache (Later Maybe)
        // addConToNode(state, {node: fromID, connection: conGUID})
        // addConToNode(state, {node: toID, connection: conGUID})
    } else{
        console.error({
            msg: "One or more of the nodes in the connection do not exist! Or are in difrent flows!",
            con: {conGUID, fromID, fromPort, toID, toPort},
            to: state.nodes[toID],
            from: state.nodes[fromID],
            flowsMatch: (toFlow ? toFlow.key : 'Not Found') == (fromFlow ? fromFlow.key : 'Not Found'),
            toFlow: toFlow ? toFlow.key : 'Not Found',
            fromFlow: fromFlow ? fromFlow.key : 'Not Found'
        })
    }
}
export const unsetConnection = (state: FlowsState, conGUID: string) => {
    //console.log("Debug: unsetConnection")
    // If connection does not exist bail out
    if(state.connections[conGUID] == undefined) return
    
    // get con for data
    //const con = ObjectFind(state.connections, (v, key) => key == conGUID)

    // filter out this connection from connections list
    state.connections = ObjectFilter(state.connections, (v, key) => key != conGUID)
    
    // Get remove this connection from any flows that contain it
    ObjectForEach(state.flows, (key, flow: Flow) => {
        // Get filtered list of connections for Flow
        const newCons = flow.connections.filter(guid => guid != conGUID)
        // Check that the list changed
        if(newCons.length != flow.connections.length){
            flow.connections = newCons
        }
    })
}

export const mutations: MutationTree<FlowsState> = {
    setFlow,
    setNode,
    removeNode,
    setNodePos,
    addNodeToFlow,
    addConToFlow,
    setConnection,
    unsetConnection
};