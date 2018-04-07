import BinaryBitConnector from './BinaryBitConnector';
import Gate from '../Gate';

export default class InputGateBit extends Gate {
    public name: string = 'Input Bit ()';

    public pinOut: BinaryBitConnector

    constructor(public pinName: string) {
        super('Input Bit ()', [], [new BinaryBitConnector('Out')])
        this.name = 'Input Bit (' + pinName + ')'
        this.pinOut = this.OutputConnectors[0] as BinaryBitConnector
    }

    public setValue: (pinState: boolean) => void = (pinState) => {
        this.pinOut.setValue(pinState)
    }

    public update(connector: BinaryBitConnector) {
    }
}