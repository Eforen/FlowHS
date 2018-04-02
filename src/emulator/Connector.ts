import Wire from './Wire';
import Gate from './Gate';

export default class Connector {
    constructor(public name: string) {

    }

    public gate: Gate;
    public output: boolean;

    public type: string = 'any';
    public acceptedTypes: string[] = ['any'];
    public canConnectWith(socket: Connector): boolean{
        return this.acceptedTypes.indexOf('any') > -1 || this.acceptedTypes.indexOf(socket.type) > -1;
    }

    protected value: any
    public setValue(value: any){
        //Set value
        //Call update on connected gates if value is dif

        if (value == this.value) return
        this.value = value

        if (this.output){
            this.connections.forEach((wire) => {
                wire.Input.update()
            })
        }
    }
    public getValue(): any{
        return this.value;
    }

    public connections: Wire[] = []
    public update: () => void = () => {
        if (this.gate != undefined){
            this.gate.update(this)
        }
    }
}