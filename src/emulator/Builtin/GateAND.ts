import BinaryBitConnector from './BinaryBitConnector';
import Gate from '../Gate';

export default class GateAND extends Gate {
    public name: string = 'GateAND';

    public pinA: BinaryBitConnector
    public pinB: BinaryBitConnector
    public pinOut: BinaryBitConnector

    constructor() {
        super('AND Gate Built-In', [new BinaryBitConnector('A'), new BinaryBitConnector('B')], [new BinaryBitConnector('Out')])
        this.pinA = this.InputConnectors[0] as BinaryBitConnector
        this.pinB = this.InputConnectors[1] as BinaryBitConnector
        this.pinOut = this.OutputConnectors[0] as BinaryBitConnector
    }

    public update(connector: BinaryBitConnector) {
        if (connector === this.pinA || connector === this.pinB){
            this.pinOut.setValue(this.pinA.getValue() && this.pinB.getValue())
        }
    }
}