import BinaryBitConnector from './BinaryBitConnector';
import Gate from '../Gate';

export default class GateXNOR extends Gate {
    public name: string = 'GateXNOR';

    public pinA: BinaryBitConnector
    public pinB: BinaryBitConnector
    public pinOut: BinaryBitConnector

    constructor() {
        super('XNOR Gate Built-In', [new BinaryBitConnector('A'), new BinaryBitConnector('B')], [new BinaryBitConnector('Out')])
        this.pinA = this.InputConnectors[0] as BinaryBitConnector
        this.pinB = this.InputConnectors[1] as BinaryBitConnector
        this.pinOut = this.OutputConnectors[0] as BinaryBitConnector
    }

    public update(connector: BinaryBitConnector) {
        if (connector === this.pinA || connector === this.pinB){
            this.pinOut.setValue((this.pinA.getValue() && this.pinB.getValue()) || (this.pinA.getValue() == false && this.pinB.getValue() == false))
        }
    }
}