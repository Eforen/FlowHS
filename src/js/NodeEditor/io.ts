import Connection from './connection';
import Socket from './socket';
import Node from './Node';

export default class IO {

    constructor(public title: string, public socket: Socket, public multipleConnections: boolean = false) {
	    this.node = null;
        this.connections = [];
    }

    node: Node | null;
    connections: Connection[];
    el: HTMLElement;
    
    removeConnection(connection: Connection) {
        this.connections.splice(this.connections.indexOf(connection), 1);
    }
}