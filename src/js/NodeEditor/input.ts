import Connection from './connection';
import Control from './control';
import Socket from './socket';
import IO from './io';
import Node from './node'
import Output from './output';

export default class Input extends IO {
   
    constructor(title: string, socket: Socket, multiConns: boolean = false) {
        super(title, socket, multiConns);
        this.control = null;
    }

    control: Control | null;

    hasConnection() {
        return this.connections.length > 0;
    }

    addConnection(connection: Connection) {
        if (!this.multipleConnections && this.hasConnection())
            throw new Error('Multiple connections not allowed');
        this.connections.push(connection);
    }

    addControl(control: Control) {
        this.control = control;
        control.parent = this;
    }

    showControl() {
        return !this.hasConnection() && this.control !== null;
    }

    toJSON() {
        return {
            'connections': this.connections.map(c => {
                return {
                    node: (<Node>(<Output>(<Connection>c).output).node).id,
                    output: (<Node>(<Output>(<Connection>c).output).node).outputs.indexOf(c.output)
                };
            })
        };
    }
}