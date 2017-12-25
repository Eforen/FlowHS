import Block from './block';
import Component from './component';
import Control from './control';
import Input from './input';
import Output from './output';
import Group from './group'
import Connection from './connection';

export default class Node extends Block {
   static latestId: number;
    constructor(public title: string) {
        super(Node);
        this.group = null;
        this.inputs = [];
        this.outputs = [];
        this.controls = [];
        this.data = {};

        //this.title = title;
        [this.width, this.height] = [180, 100];
    }

    id: number;
    group: Group | null;
    inputs: Input[];
    outputs: Output[];
    controls: Control[];
    data: any;
    width: number;
    height: number;

    unlockPool: any[];
    outputData: any;
    busy: boolean;

    addControl(control: Control, index: number | null = null) {
        control.parent = this;

        if (index !== null)
            this.controls.splice(index, 0, control);
        else
            this.controls.push(control);        
        
        return this;
    }

    addInput(input: Input, index: number | null = null) {
        if (input.node !== null)
            throw new Error('Input has already been added to the node');
        
        input.node = this;

        if (index !== null)
            this.inputs.splice(index, 0, input);
        else
            this.inputs.push(input);
        
        return this;
    }

    addOutput(output: Output, index: number | null = null) {
        if (output.node !== null)
            throw new Error('Output has already been added to the node');
        
        output.node = this;

        if (index !== null)
            this.outputs.splice(index, 0, output);
        else
            this.outputs.push(output);

        return this;
    }

    getConnections(type: string | undefined = undefined) {
        let conns = Connection[0];

        if (type === 'input' || !type)
            this.inputs.map(input => {
                input.connections.forEach(c => {
                    conns.push(c);
                });
            });
        
        if (type === 'output' || !type)
            this.outputs.forEach(output => {
                output.connections.forEach(c => {
                    conns.push(c);
                });
            });
        return conns;
    }

    inputsWithVisibleControl() {
        return this.inputs.filter((input) => {
            return input.showControl();
        });
    }

    toJSON() {
        return {
            'id': this.id,
            'data': this.data,
            'group': this.group ? this.group.id : null,
            'inputs': this.inputs.map(input => input.toJSON()),
            'outputs': this.outputs.map(output => output.toJSON()),
            'position': this.position,
            'title': this.title
        }
    }

    static async fromJSON(component: Component, json: Object) {
        let node: Node = component.newNode();

        node.id = (<any>json).id;
        node.data = (<any>json).data;
        Node.latestId = Math.max(node.id, Node.latestId);
        node.position = (<any>json).position;
        node.title = (<any>json).title;

        await component.builder(node);

        return node;
    }
}