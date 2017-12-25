import Node from './node';
// @ts-ignore
//import template from './templates/node.pug';

//let defaultTemplate = template();
import * as pug from 'pug'
let defaultTemplate = pug.compileFile('./src/js/NodeEditor/templates/node.pug');

export interface ComponentProps {
    template: pug.compileTemplate;
    builder: any;
    worker: any;
}

export default class Component {
    constructor(public name: string, public props: ComponentProps) {
        //this.name = name;
        this.template = props.template || defaultTemplate;
        this.builder = props.builder;
        this.worker = props.worker;
    }

    template: pug.compileTemplate;
    builder: any;
    worker: any;

    newNode() {
        return new Node(this.name);
    }
}