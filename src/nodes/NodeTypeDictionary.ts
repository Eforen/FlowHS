import NodeType, { NodeLogicType } from './NodeType'

interface NodeTypeStorage {
    [index: string]: NodeType<any>
}

class NodeTypeDictionaryClass {
    store: NodeTypeStorage = {}
    
    addType(name: NodeLogicType, type: NodeType<any>){
        if(this.store[name] != undefined){
            console.warn("Warning adding NodeType that is already defined.", {target: {name, type}, current: this.store[name], store: this.store})
        }
        this.store[name] = type
    }
    getType(name: NodeLogicType | string): NodeType<any> {
        if(this.store[name] == undefined){
            throw `The type ${name} is not defined.`
        }
        return this.store[name] || null
    }
}

const NodeTypeDictionary = new NodeTypeDictionaryClass()

export function registerNodeType(name: NodeLogicType) { // this is the decorator factory
    return function (target: new() => NodeType<any>) { // this is the decorator
        NodeTypeDictionary.addType(name, new target)
    }
}

export default NodeTypeDictionary

// Imports for registration side effects
require('./types') // Can't use import here because all imports run before any code in the file