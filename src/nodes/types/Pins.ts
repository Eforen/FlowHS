import NodeType, { NodeTypeOptions, NodeTypeArgsDef } from "../NodeType";

export interface IPinArgs {
    pinName: string
}
export const ntPinArgTypes: NodeTypeArgsDef = {
    pinName: 'string'
}
export class ntPin extends NodeType<IPinArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "Pin",
            color: '#a6bbcf',
            ...overrides
        }, ntPinArgTypes)
    }

    getTitle(args: IPinArgs){
        return `${this.config.title}: ${args.pinName}`
    }
}

/********************
 * Start Pin In
 ********************/
// export interface IPinInArgs extends IPinArgs {
// }
export class ntPinIn extends ntPin {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "Pin In",
            outputs: 1, 
            ...overrides
        })
    }
}
/********************
 * End Pin In
 ********************/

/********************
 * Start Pin out
 ********************/
// export interface IPinOutArgs extends IPinArgs {
// }

export class ntPinOut extends ntPin {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "Pin Out",
            inputs: 1, 
            ...overrides
        })
    }
}
/********************
 * End Pin out
 ********************/