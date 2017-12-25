import Component from './component';
import Utils from './utils';
import Node from './node';

enum State {
    AVALIABLE = 0,
    PROCESSED = 1,
    ABORT = 2
}

export default class Engine {

    constructor(public id: string, public components: Component[]) {

        if (!Utils.isValidId(id))
            throw new Error('ID should be valid to name@0.1.0 format');  
        
        //this.id = id;
        //this.components = components;
        this.args = [];
        this.data = null;
        this.state = State.AVALIABLE;
        this.onAbort = () => undefined;
    }

    args: any[];
    data: any;
    state: any;
    onAbort: () => void;

    clone() {
        return new Engine(this.id, this.components);
    }

    processStart() {
        if (this.state === State.AVALIABLE) {  
            this.state = State.PROCESSED;
            return true;
        }

        if (this.state === State.ABORT) {
            return false;
        }

        console.warn('The process is busy and has not been restarted. Use abort() to force it to complete');
        return false;
    }

    processDone() {
        let success = this.state !== State.ABORT;

        this.state = State.AVALIABLE;
        
        if (!success) {
            this.onAbort();
            this.onAbort = () => undefined
        }    

        return success;
    }

    async abort() {
        return new Promise(ret => {
            if (this.state === State.PROCESSED) {
                this.state = State.ABORT;
                this.onAbort = ret;
            }
            else if (this.state === State.ABORT) {
                this.onAbort();
                this.onAbort = ret;
            }
            else
                ret();
        });
    }

    async lock(node: Node) {
        return new Promise(res => {
            node.unlockPool = node.unlockPool || [];
            if (node.busy && !node.outputData)
                node.unlockPool.push(res);
            else 
                res();
            
            node.busy = true;
        });    
    }

    unlock(node: Node) {
        node.unlockPool.forEach(a => a());
        node.unlockPool = [];
        node.busy = false;
    }

    async extractInputData(node: Node) {
        return await Promise.all(node.inputs.map(async (input) => {
            let conns = input.connections;
            let connData = await Promise.all(conns.map(async (c) => {

                let outputs = await this.processNode(this.data.nodes[c.node]);

                if (!outputs) 
                    this.abort();
                //else
                    //return outputs[c.output];
                //TODO: Figure Out what the goal was here...
            }));

            return connData;
        }));
    }

    async processNode(node: Node) {
        if (this.state === State.ABORT || !node)
            return null;
        
        await this.lock(node);

        if (!node.outputData) {
            let inputData = await this.extractInputData(node);

            node.outputData = node.outputs.map(() => null);
        
            let key = node.title;
            let component = this.components.find(c => c.name === key);

            try {
                await component.worker(node, inputData, node.outputData, ...this.args);
            } catch (e) {
                this.abort();
                console.warn(e);
            }
            if (node.outputData.length !== node.outputs.length)
                throw new Error('Output data does not correspond to number of outputs');
            
        }

        this.unlock(node);
        return node.outputData;
    }

    async forwardProcess(node: Node) {
        
        if (this.state === State.ABORT)
            return null;

        return await Promise.all(node.outputs.map(async (output) => {
            return await Promise.all(output.connections.map(async (c) => {
                await this.processNode(this.data.nodes[c.node]);
                await this.forwardProcess(this.data.nodes[c.node]);
            }));
        }));
    }

    copy(data: any) {
        data = Object.assign({}, data);
        data.nodes = Object.assign({}, data.nodes);
        
        Object.keys(data.nodes).forEach(key => {
            data.nodes[key] = Object.assign({}, data.nodes[key])
        });
        return data;
    }

    async process(data: Object, startId: number | null = null, ...args: any[]) {
        if (!this.processStart()) return;
        
        let checking = Utils.validate(this.id, data);

        if (!checking.success)
            throw new Error(checking.msg);  
        
        this.data = this.copy(data);
        this.args = args;
        
        if (startId) {
            let startNode = this.data.nodes[startId];

            if (!startNode)
                throw new Error('Node with such id not found');   
            
            await this.processNode(startNode);
            await this.forwardProcess(startNode);
        }
        
        for (let i in this.data.nodes) // process nodes that have not been reached
            if (typeof this.data.nodes[i].outputData === 'undefined') {
                let node = this.data.nodes[i];

                await this.processNode(node);
                await this.forwardProcess(node);
            }
        
        return this.processDone() ? 'success' : 'aborted';
    }
}