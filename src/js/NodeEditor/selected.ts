import Group from './group';
import Node from './node';

export default class Selected {

    constructor() {
        this.list = [];
    }

    list: (Node | Group) []

    add(item: Node | Group, accumulate = false) {
        if (accumulate) {
            if (this.contains(item))
                this.remove(item);
            else
                this.list.push(item);
        }
        else
            this.list = [item];    
    }

    clear() {
        this.each((item: (Node | Group)) => {
            this.remove(item);
        });
    }

    remove(item: (Node | Group)) {
        this.list.splice(this.list.indexOf(item), 1);
    }

    contains(item: (Node | Group)) {
        return this.list.indexOf(item) !== -1;
    }

    each(callback: any) {
        this.list.forEach(callback);
    }

    eachNode(callback: any) {
        this.list.filter(item => item instanceof Node).forEach(callback);
    }

    eachGroup(callback: any) {
        this.list.filter(item => item instanceof Group).forEach(callback);
    }

    getNodes() {
        return this.list.filter(item => item instanceof Node);
    }

    getGroups() {
        return this.list.filter(item => item instanceof Group);
    }
}