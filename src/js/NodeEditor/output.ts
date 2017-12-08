import Connection from './connection';
import Input from './input';
import Socket from './socket';
import IO from './io';

export default class Output extends IO {
  
    constructor(title: string, socket: Socket, multiConns: boolean = true) {
        super(title, socket, multiConns);
    }
    
    hasConnection() {
        return this.connections.length > 0;
    }

    connectTo(input: Input) {
        if (!this.socket.compatibleWith(input.socket))
            throw new Error('Sockets not compatible');
        if (!input.multipleConnections && input.hasConnection())
            throw new Error('Input already has one connection');
        if (!this.multipleConnections && this.hasConnection())
            throw new Error('Output already has one connection');

        let connection = new Connection(this, input);

        this.connections.push(connection);
        return connection;
    }

    connectedTo(input: Input) {
        return this.connections.some((item) => {
            return item.input === input;
        });
    }

    toJSON() {
        return {
            'connections': this.connections.map(c => {
                return {
                    node: c.input.node.id,
                    input: c.input.node.inputs.indexOf(c.input)
                }
            })
        };
    }
}