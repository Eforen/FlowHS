import Connector from './Connector';

export default class Wire{
    public Input: Connector;
    public Output: Connector;
    constructor(output: Connector, input: Connector) {
        this.Input = input;
        this.Output = output;
    }
}