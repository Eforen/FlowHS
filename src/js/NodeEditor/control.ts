import Node from './node';
import Input from './input';

export default class Control {

    constructor(public html: string, public handler: () => void = () => undefined ) {
        this.html = html;
        this.parent = null;
        this.handler = handler;
    }

    parent: Node | Input | null

    getNode() {
        if (this.parent === null)
            throw new Error("Control isn't added to Node/Input");   
        
        return this.parent instanceof Node ? this.parent : this.parent.node;
    }

    getData(key: number|string) {
        // @ts-ignore
        return this.getNode().data[key];
    }

    putData(key: number|string, data: any) {
        // @ts-ignore
        this.getNode().data[key] = data;
    }  
}