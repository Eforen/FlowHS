import * as React from 'react';

export interface ISVGComponentProps {
     height: string
     width: string
     style: any
}

export interface ISVGComponentState {
}

export class SVGComponent extends React.Component<ISVGComponentProps, ISVGComponentState>{
    render() {
        return <svg style={{ position: 'absolute', ...this.props.style }} {...this.props} ref='svg'>{this.props.children}</svg>;
    }
}