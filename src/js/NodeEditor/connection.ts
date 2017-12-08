import Output from './output';
import Input from './input';

export default class Connection {

    constructor(public output: Output, public input: Input) {
        this.output = output;
        this.input = input;
        this.style = {};

        this.input.addConnection(this);
    }

    style: any;

    remove() {
        this.input.removeConnection(this);
        this.output.removeConnection(this);
    }
}