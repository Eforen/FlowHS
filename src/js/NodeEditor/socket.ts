export default class Socket {

    constructor(public id: string, public name: string, public hint: string) {
        //this.id = id;
        //this.name = name;
        //this.hint = hint;
        this.compatible = [];
    }

    compatible: Socket[]

    combineWith(socket: Socket) {
        this.compatible.push(socket);
    }

    compatibleWith(socket: Socket) {
        return this === socket || this.compatible.indexOf(socket) > -1;
    }
}