import Output from './output';
import Input from './input';
import Node from './node';

export default class Connection {

    constructor(public output: Output, public input: Input) {
        //this.output = output;
        //this.input = input;
        this.style = {};

        this.input.addConnection(this);
    }

    style: any;
    node: number;

    remove() {
        this.input.removeConnection(this);
        this.output.removeConnection(this);
    }
}