export default class Block {
constructor(Class: any) {
        if (this.constructor === Block)
            throw new TypeError('Cannot construct Block instances')
        
        this.id = Block.incrementId(Class);
        this.position = [0.0, 0.0];
        this.width = 0;
        this.height = 0;
        this.style = {};
    }
    
    id: number;
    position: number[];
    width: number;
    height: number;
    style: object;

    static incrementId(Class: any) {
        if (!Class.latestId)
            Class.latestId = 1
        else
            Class.latestId++
        return Class.latestId
    }
}