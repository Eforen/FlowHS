import Component from './component';
import Connection from './connection';
import ContextMenu from './contextmenu';
import EditorView from './editorview';
import EventListener from './eventlistener';
import Group from './group';
import History from './history';
import Input from './input';
import Node from './node';
import Output from './output';
import Selected from './selected';
import Utils from './utils';
import * as d3 from 'd3'

export default class NodeEditor {

    constructor(public id: string, container: HTMLElement, public components: Component[], menu: ContextMenu) {

        if (!Utils.isValidId(id))
            throw new Error('ID should be valid to name@0.1.0 format');  
        
        //this.id = id;
        this._id = Math.random().toString(36).substr(2, 9);
        //this.components = components;
        this.view = new EditorView(this, container, menu);
        this.eventListener = new EventListener();
        this.selected = new Selected();
        this.history = new History(this);
        this.nodes = [];
        this.groups = [];
        this.readOnly = false;
        
        this.view.resize();
    }

    _id: string;
    view: EditorView;
    eventListener: EventListener;
    selected: Selected;
    history: History;
    nodes: Node[];
    groups: Group[];
    readOnly: boolean;
    paths: any[];

    addNode(node: Node, mousePlaced = false) {
        if (this.eventListener.trigger('nodecreate', node)) {
            if (mousePlaced)
                node.position = this.view.mouse;
            this.nodes.push(node);
            this.eventListener.trigger('change');
            
            this.history.add(this.addNode.bind(this),
                            this.removeNode.bind(this),
                            [node]);
        }
    }

    addGroup(group: Group) {
        if (this.eventListener.trigger('groupcreate', group)) {
            this.groups.push(group);
            this.eventListener.trigger('change');
        }
        
        this.view.update();
    }

    removeNode(node: Node) {
        let index = this.nodes.indexOf(node);

        if (this.eventListener.trigger('noderemove', node)) {
            node.getConnections().forEach(c => this.removeConnection(c));

            this.nodes.splice(index, 1);
            this.eventListener.trigger('change');

            this.history.add(this.removeNode.bind(this),
                            this.addNode.bind(this),
                            [node]);
        }

        this.view.update();
    }

    removeGroup(group: Group) {
        if (this.eventListener.trigger('groupremove', group)) {
            group.remove();
            this.groups.splice(this.groups.indexOf(group), 1);
            this.eventListener.trigger('change');
        }    

        this.view.update(); 
    }

    connect(output: Output | Connection, input: Input = undefined) {
        if (output instanceof Connection) {
            input = output.input;
            output = output.output;
        }

        if (this.eventListener.trigger('connectioncreate', { output, input })) {
            try {
                let connection = output.connectTo(input);

                this.eventListener.trigger('change');
                this.history.add(this.connect.bind(this),
                                this.removeConnection.bind(this),
                                [connection]);
            } catch (e) {
                console.warn(e);
                this.eventListener.trigger('error', e);
            }
        }
        this.view.update(); 
    }

    removeConnection(connection: Connection) {
        if (this.eventListener.trigger('connectionremove', connection)) {
            connection.remove();
            this.eventListener.trigger('change');

            this.history.add(this.removeConnection.bind(this),
                            this.connect.bind(this),
                            [connection]);
        }
        this.view.update(); 
    }

    selectNode(node: Node, accumulate: boolean = false) {
        if (this.nodes.indexOf(node) === -1)
            throw new Error('Node not exist in list');
        
        if (this.eventListener.trigger('nodeselect', node))
            this.selected.add(node, accumulate);
        
        this.view.update();
    }

    selectGroup(group: Group, accumulate: boolean = false) {
        if (this.groups.indexOf(group) === -1)
            throw new Error('Group not exist in list');
        
        if (this.eventListener.trigger('groupselect', group))
            this.selected.add(group, accumulate);
        
        this.view.update();
    }
    
    keyDown(event: any) {
        if (this.readOnly) return;

        switch (d3.event.keyCode) {
        case 46:
            this.selected.eachNode(this.removeNode.bind(this));
            this.selected.eachGroup(this.removeGroup.bind(this));
            this.view.update();
            break;
        case 71:
            let nodes = this.selected.getNodes();
                
            if (nodes.length > 0) 
                this.addGroup(new Group('Group', { nodes }));
            
            break;
        case 90:
            if (d3.event.ctrlKey && d3.event.shiftKey)
                this.history.redo();  
            else        
            if (d3.event.ctrlKey)
                this.history.undo();
                
            break    
        }
    }

    clear() {
        this.nodes.splice(0, this.nodes.length);
        this.groups.splice(0, this.groups.length);
    }

    toJSON() {
        let nodes = {};
        let groups = {};

        this.nodes.forEach(node => nodes[node.id] = node.toJSON());
        this.groups.forEach(group => groups[group.id] = group.toJSON());

        return {
            'id': this.id,
            'nodes': nodes,
            'groups': groups
        };
    }

    async fromJSON(json: Object | any) {
        let checking = Utils.validate(this.id, json);
        
        if (!checking.success) {
            this.eventListener.trigger('error', checking.msg);
            console.warn(checking.msg);
            return false;
        }
        
        this.eventListener.persistent = false;
        
        this.clear();
        let nodes = {};

        try {
            await Promise.all(Object.keys(json.nodes).map(async id => {
                let node = json.nodes[id];
                let component = this.components.find(c => {
                    return c.name === node.title
                });

                if (!component) throw `Component ${node.title} was not found`;

                nodes[id] = await Node.fromJSON(component, node);
                this.addNode(nodes[id]);
            }));
        
            Object.keys(json.nodes).forEach(id => {
                let jsonNode = json.nodes[id];
                let node = nodes[id];
                
                jsonNode.outputs.forEach((outputJson, i) => {
                    outputJson.connections.forEach(jsonConnection => {
                        let nodeId = jsonConnection.node;
                        let inputIndex = jsonConnection.input;
                        let targetInput = nodes[nodeId].inputs[inputIndex];

                        this.connect(node.outputs[i], targetInput);
                    });
                });

            });

            if (typeof json.groups === 'object')
                Object.keys(json.groups).forEach(id => {
                    let group = Group.fromJSON(json.groups[id]);

                    json.groups[id].nodes.forEach(nodeId => {
                        let node = nodes[nodeId];

                        group.addNode(node);
                    })
                    this.addGroup(group);
                });
        }
        catch (e) {
            console.warn(e);
            this.eventListener.trigger('error', e);
            return false;
        }
        this.view.update();
        this.eventListener.persistent = true;
        return true;
    }
}