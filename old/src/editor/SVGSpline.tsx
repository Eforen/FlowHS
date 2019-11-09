import * as React from 'react';

export interface ISVGSplineProps {
    start: {x: number, y: number}
    end: { x: number, y: number }
}

export interface ISVGSplineState {
    selected: boolean
    hovering: boolean
}

export class SVGSpline extends React.Component<ISVGSplineProps, ISVGSplineState> {

    constructor(props: ISVGSplineProps){
        super(props)
        this.state = {
            selected: false,
            hovering: false
        }
    }

    handleClick(e: any) {
        //Do nothing for now
    }

    handleEnter(e: any) {
        this.state.hovering = true
    }

    handleLeave(e: any) {
        this.state.hovering = false
    }

    render() {
        let { selected, hovering } = this.state;

        let { start, end } = this.props;

        let dist = this.distance([start.x, start.y], [end.x, end.y]);

        let pathString = this.bezierCurve(start.x,                  // start x
            start.y,                  // start y
            start.x + dist * 0.25,    // cp1 x
            start.y,                  // cp1 y
            end.x - dist * 0.75,     // cp2 x
            end.y,                    // cp2 y
            end.x,                   // end x
            end.y);                   // end y

        let className = 'connector' + (selected ? ' selected' : '');

        return (
            <g>
                <path className='connector-click-area' d={pathString} onMouseEnter={(e) => { this.handleEnter(e) }} onMouseLeave={(e) => { this.handleLeave(e) }} onClick={(e) => { this.handleClick(e) }} />
                <path className={className + (hovering ? ' hovering' : '')} d={pathString} onMouseEnter={(e) => { this.handleEnter(e) }} onMouseLeave={(e) => { this.handleLeave(e) }} onClick={(e) => { this.handleClick(e) }} />
            </g>
        );
    }

    bezierCurve(a: number, b: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        return `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y}  ${x},${y}`;
    }

    distance(a: number[], b: number[]) {
        return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
    }
}