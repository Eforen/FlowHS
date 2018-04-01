import Wire from './Wire';

export default class Connector {
    constructor(public name: string) {

    }

    public type: string | string[] = 'none';
    public acceptedTypes: string[] = ['any'];
    public canConnectWith(socket: Connector): boolean{
        return this.acceptedTypes.indexOf('any') > -1 || this.acceptedTypes.indexOf(socket.type) > -1;
    }

    protected value: any
    public setValue(value: any){
        //Set value
        //Call update on connected gates if value is dif
    }
    public getValue(): any{
        return this.value;
    }

    public connections: Wire[] = []
}