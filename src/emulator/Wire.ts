import Connector from './Connector';

export default class Wire{
    public Input: Connector;
    public Output: Connector;
    constructor(input: Connector, output: Connector) {
        this.Input = input;
        this.Output = output;
    }
}