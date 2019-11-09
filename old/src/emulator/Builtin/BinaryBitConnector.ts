import Connector from '../Connector';

export default class BinaryBitConnector extends Connector {
    public type: string = 'bit';
    public acceptedTypes: string[] = ['bit'];
    protected value: boolean;

    public setValue(value: boolean) {
        //Call update on connected gates if value is dif
        super.setValue(value)
    }
    public getValue(): boolean {
        return super.getValue() as boolean
    }
}

