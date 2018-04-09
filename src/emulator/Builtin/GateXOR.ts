import BinaryBitConnector from './BinaryBitConnector';
import Gate from '../Gate';

export default class GateXOR extends Gate {
    public name: string = 'GateXOR';

    public pinA: BinaryBitConnector
    public pinB: BinaryBitConnector
    public pinOut: BinaryBitConnector

    constructor() {
        super('XOR Gate Built-In', [new BinaryBitConnector('A'), new BinaryBitConnector('B')], [new BinaryBitConnector('Out')])
        this.pinA = this.InputConnectors[0] as BinaryBitConnector
        this.pinB = this.InputConnectors[1] as BinaryBitConnector
        this.pinOut = this.OutputConnectors[0] as BinaryBitConnector
    }

    public update(connector: BinaryBitConnector) {
        if (connector === this.pinA || connector === this.pinB){
            this.pinOut.setValue(this.pinA.getValue() != this.pinB.getValue())
        }
    }
}