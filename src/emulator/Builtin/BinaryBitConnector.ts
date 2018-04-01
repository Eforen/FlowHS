import Connector from '../Connector';

export default class BinaryBitConnector extends Connector {
    public type: string | string[] = 'BinBit';
    public acceptedTypes: string[] = ['BinBit'];
    protected value: boolean;

    public setValue(value: boolean) {
        if (value == this.value) return
        
        //Call update on connected gates if value is dif
    }
    public getValue(): boolean {
        return this.value;
    }
}