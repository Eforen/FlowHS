//import * as React from 'react';

export interface HoverState {
    hovering: {
        node: number
        input: boolean
        connector: number
    }[]
}

export const HoverStateDefault: HoverState = {
    hovering: []
}