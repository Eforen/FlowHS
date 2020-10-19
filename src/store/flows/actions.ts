// profile/actions.ts
import { ActionTree, Dispatch } from 'vuex';
import { FlowsState, Node, Flow, Connection } from './types';
import { RootState } from '../types';
import { ObjectCount, ObjectFind, ObjectForEach } from '@/util/ObjectDictionary';
import { SaveDialogReturnValue, remote, ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from 'electron';
import { NodeTypeArgs } from '@/nodes/NodeType';
import * as fs from 'fs';
import { CreateNotification } from '@/store/notification/actions'
import { doWorkspaceActionLoadFlow } from '../workspace/actions';

export interface FlowActionMoveNode{
    node: string,
    x: number,
    y: number
}

export interface FlowActionRenameFlow{
    flowID: string,
    newName: string
}

export interface FlowSaveFileConnection {
    guid: string,
    fromID: string,
    fromPort: number,
    toID: string,
    toPort: number
}

export interface FlowSaveFileNode {
    type: string, 
    inputState: boolean[],
    args: NodeTypeArgs
}

export interface FlowSaveFileData {
    flowID: string,
    title: string,
    inputs: string[],
    outputs: string[],
    connections: FlowSaveFileConnection[],
    nodes: FlowSaveFileNode[],
}

const getEncapsulatedFlow: (rootState: RootState, flowID: string) => FlowSaveFileData = (rootState, flowID) =>  {
    return {
        flowID: flowID,
        title: rootState.flows.flows[flowID].title,
        inputs: rootState.flows.flows[flowID].inputs,
        outputs: rootState.flows.flows[flowID].outputs,
        connections: rootState.flows.flows[flowID].connections.map(connectionID => ({
            guid: rootState.flows.connections[connectionID].guid,
            fromID: rootState.flows.connections[connectionID].fromID,
            fromPort: rootState.flows.connections[connectionID].fromPort,
            toID: rootState.flows.connections[connectionID].toID,
            toPort: rootState.flows.connections[connectionID].toPort
        })),
        nodes: rootState.flows.flows[flowID].nodes.map(nodeID =>({
            type: rootState.flows.nodes[nodeID].type, 
            inputState: rootState.flows.nodes[nodeID].inputState,
            args: rootState.flows.nodes[nodeID].args
        }))
    }
}
export const doLoadFlow: (dispatch: Dispatch, filePath: string, flowStr?: string) => Promise<{loaded: boolean, notification: string, id: string}> = async (dispatch, filePath, flowStr?) => {
    return await dispatch('flows/loadFlow', {filePath, flowStr}, {root: true});
}

export const actions: ActionTree<FlowsState, RootState> = {
    connectToEmulator({ commit }) {
        
    },
    async loadFlowFromFilePicker({ commit, rootState, dispatch }){
        let options: OpenDialogOptions = {
            //Placeholder 1
            title: "FlowHS: Save Chip",
            
            //Placeholder 4
            buttonLabel : "Load Chip File",
            
            //Placeholder 3
            filters :[
                {name: 'FlowHS Chip File', extensions: ['chip']},
                {name: 'All Files', extensions: ['*']}
            ],

            properties: ['multiSelections', 'openFile']
        }
        
        let r: OpenDialogReturnValue = await remote.dialog.showOpenDialog(options)
        if(r.canceled == false && r.filePaths != undefined){
            for (let i = 0; i < r.filePaths.length; i++) {
                const filePath = r.filePaths[i];
                const flow = await doLoadFlow(dispatch, filePath)
                if(flow.loaded) await doWorkspaceActionLoadFlow(dispatch, flow.id)
            }
        }
    },
    /** 
     * This action will load the var flow.
     */
    async loadFlow({ commit, rootState, dispatch }, {filePath, flowStr}:{filePath: string, flowStr?: string}) {
        let flow: FlowSaveFileData
        if(flowStr === undefined || flowStr.trim() == "") {
            // Load the file from path
            try {
                flowStr = await (await fs.promises.readFile(filePath)).toString()
            } catch (error) {
                return {loaded: false, notification: await CreateNotification(dispatch, {
                    closable: true,
                    icon: "mdi-error",
                    text: `Load Flow: Could not read file \`${filePath}\``,
                    border: 'left'
                }), id: ''}
            }
        }
        try {
            if(flowStr === undefined || flowStr.trim() == ""){
                return {loaded: false, notification: await CreateNotification(dispatch, {
                    closable: true,
                    icon: "mdi-error",
                    text: `Load Flow: Corruption \`637b9725-61b8-4692-b926-bc4957444c26\` or flow file was blank`,
                    border: 'left'
                }), id: ''}
            }
            flow = JSON.parse(flowStr)
        } catch (error) {
            return {loaded: false, notification: await CreateNotification(dispatch, {
                closable: true,
                icon: "mdi-error",
                text: `Load Flow: Could parse flow`,
                border: 'left'
            }), id: ''}
        }

        if(rootState.flows.flows[flow.flowID]){
            return {loaded: false, notification: await CreateNotification(dispatch, {
                closable: true,
                icon: "mdi-error",
                text: `Load Flow: Flow ID (${flow.flowID}) already exists in editor. Please close the flow before re-opening.`,
                border: 'left'
            }), id: ''}
        } else {
            commit('setFlow', {
                filename: filePath,
                changed: false,
                guid: flow.flowID,
                connections: flow.connections.map(connection =>connection.guid),
                nodes: flow.nodes.map(node =>node.args.guid),
                inputs: flow.inputs,
                outputs: flow.outputs,
                title: flow.title,
                error: false,
                isProxy: false
            } as Flow)
            flow.nodes.forEach(node =>{
                commit('setNode', {
                    type: node.type, 
                    inputState: node.inputState,
                    args: node.args
                } as Node)
            })
            flow.connections.forEach(connection =>{
                commit('setConnection', {
                    conGUID: connection.guid, 
                    fromID: connection.fromID, 
                    fromPort: connection.fromPort, 
                    toID: connection.toID, 
                    toPort: connection.toPort
                })
            })
            return {loaded: true, notification: await CreateNotification(dispatch, {
                closable: true,
                icon: "mdi-error",
                text: `Loaded Flow${flow.title.trim() == "" ? " ID #" :""}: ${flow.title.trim() == "" ? flow.flowID : flow.title}`,
                border: 'left',
                timeout: 2000
            }), id: flow.flowID}
        }
    }, 
    async saveFlow({ commit, rootState }, flowGUID: string) {
        let options = {
            //Placeholder 1
            title: "FlowHS: Save Chip",
            
            //Placeholder 2
            defaultPath : rootState.flows.flows[flowGUID].filename.trim() == '' ? `${rootState.flows.flows[flowGUID].guid}.chip` : rootState.flows.flows[flowGUID].filename, //"C:\\BrainBell.png",
            
            //Placeholder 4
            buttonLabel : "Save Chip File",
            
            //Placeholder 3
            filters :[
                {name: 'FlowHS Chip File', extensions: ['chip']},
                {name: 'All Files', extensions: ['*']}
            ]
        }
        
        let r: SaveDialogReturnValue = await remote.dialog.showSaveDialog(options)
        
        if(r.canceled == false){
            ipcRenderer.sendSync('SaveTrigger', r.filePath, JSON.stringify(getEncapsulatedFlow(rootState, flowGUID)))
            commit('setFlowFilename', {flowID: flowGUID, filename: r.filePath})
            //console.log(r.filePath)
        } else {
            console.log('Save window closed without save canceling save action')
        }
    }, 
    loadClose({ commit }) {
        
    },
    createFlow({ commit }, flow: Flow) {
        commit('setFlow', flow)
    },
    //TODO: need to make the createNodeInSelectedFlow
    createNodeInSelectedFlow({ commit }, node: Node) {
        //commit('setNode', node)
        //commit('addNodeToFlow', {flow: flowID, node: node.guid})
        throw new Error("Method not implemented.");
    },
    createNodeInFlow({ commit }, {flowID, node}: {flowID: string, node: Node}) {
        commit('setNode', node)
        commit('addNodeToFlow', {flow: flowID, node: node.args.guid})
    },
    moveNode({ commit }, {node, x, y}: FlowActionMoveNode) {
        commit('setNodePos', {node, x, y})
    },
    //TODO: need to make the createNodeInSelectedFlow
    deleteNode({ commit, state }, nodeID: string) {
        let removedGuids = [nodeID]
    
        // Get all connections that connect to this node and remove them
        ObjectForEach(state.connections, (key, con: Connection) => {
            if(con.fromID == nodeID || con.toID == nodeID){
                removedGuids.push(con.guid)
            }
        })
        commit('removeNode', nodeID)
        commit('selection/unsetSelection', removedGuids, {root: true})
        //commit('addNodeToFlow', {flow: flowID, node: node.guid})
        //throw new Error("Method not implemented.");
    },
    createConnection({ commit, rootState }, {conGUID, fromID, fromPort, toID, toPort}: {conGUID: string, fromID: string, fromPort: number, toID: string, toPort: number}) {
        if(ObjectCount(rootState.flows.connections, (con: Connection, guid) => (conGUID == guid || (fromID == con.fromID && fromPort == con.fromPort && toID == con.toID && toPort == con.toPort) ? 1 : 0)) > 0){
            // Already exists
            console.warn('createConnection was called but connection already exists.')
            return //Bail out and don't do anything
        }
        commit('setConnection', {conGUID, fromID, fromPort, toID, toPort})
    },
    deleteConnection({ commit, rootState }, conGUID:string) {
        //console.log("Debug: deleteConnection")
        commit('unsetConnection', conGUID)
        commit('selection/unsetSelection', [conGUID], {root: true})
    },
    renameFlow({ commit, rootState }, payload:FlowActionRenameFlow) {
        //console.log("Debug: deleteConnection")
        //console.log(`Rename Action: ${payload.newName}`)
        commit('renameFlow', payload)
    },
    // fetchData({ commit }): any {
    //     axios({
    //         url: 'https://....'
    //     }).then((response) => {
    //         const payload: User = response && response.data;
    //         commit('profileLoaded', payload);
    //     }, (error) => {
    //         console.log(error);
    //         commit('profileError');
    //     });
    // }
};