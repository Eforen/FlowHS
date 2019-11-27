import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IPinArgs extends NodeTypeArgs {
    pinName: string
}
export const ntPinArgTypes: NodeTypeArgsDef = {
    pinName: 'string'
}
export class ntPin extends BasicChip<IPinArgs> {
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
@registerNodeType('PinIn')
export class ntPinIn extends ntPin {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "Pin In",
            outputs: 1, 
            button: true,
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

@registerNodeType('PinOut')
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