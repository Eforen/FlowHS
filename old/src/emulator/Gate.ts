import Connector from './Connector';

export default class Gate {
    constructor(public name: string, public InputConnectors: Connector[], public OutputConnectors: Connector[]) {
        InputConnectors.forEach(connection => { connection.gate = this })
        OutputConnectors.forEach(connection => { connection.gate = this })
    }

    public update(connector: Connector){
        
    }
}