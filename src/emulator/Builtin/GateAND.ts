import BinaryBitConnector from './BinaryBitConnector';
import Gate from '../Gate';
import Connector from '../Connector';


export default class GateAND extends Gate {
    public name: string = 'GateAND';
    
    constructor() {
        super('AND Gate Built-In', [new Connector('Input')], [new Connector('Output')])
    }

    public update(connector: BinaryBitConnector) {
        
    }
}