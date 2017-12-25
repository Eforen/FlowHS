export interface EventListenerEvents{
    nodecreate: (() => void )[]
    groupcreate: (() => void )[]
    connectioncreate: (() => void )[]
    noderemove: (() => void )[]
    groupremove: (() => void )[]
    connectionremove: (() => void )[]
    nodeselect: (() => void )[]
    groupselect: (() => void )[]
    error: (() => void )[]
    change: (() => void )[]
    transform: (() => void )[]
}

export default class EventListener {

    constructor() {
        
        this.events.nodecreate = [];
        this.events.groupcreate = [];
        this.events.connectioncreate = [];
        this.events.noderemove = [];
        this.events.groupremove = [];
        this.events.connectionremove = [];
        this.events.nodeselect = [];
        this.events.groupselect = [];
        this.events.error = [];
        this.events.change = [];
        this.events.transform = [];
        this.persistent = true;
    }

    events: EventListenerEvents;
    persistent: boolean;

    on(names: string, handler: () => {}) { 

        names.split(' ').forEach(name => {
            if (!this.events[name])
                throw new Error(`The event ${name} does not exist`); 
            this.events[name].push(handler);
        });
        
        return this;
    }

    trigger(name: string, param: any = {}) {

        if (!(name in this.events))
            throw new Error(`The event ${name} cannot be triggered`);
        
        return this.events[name].reduce((r: any, e: any) => {
            return (e(param, this.persistent) !== false) && r
        }, true); // return false if at least one event is false        
    }
}