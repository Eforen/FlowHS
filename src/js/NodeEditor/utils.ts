import Node from './node';
import * as d3 from 'd3';
import Output from './output';
import Input from './input';

export default class Utils {

    static nodesBBox(nodes: Node[]) {
        let min = (arr: number[]) => Math.min(...arr);
        let max = (arr: number[]) => Math.max(...arr);

        let left = min(nodes.map((node: Node) => node.position[0]));
        let top = min(nodes.map(node => node.position[1]));
        let right = max(nodes.map(node => node.position[0] + node.width));
        let bottom = max(nodes.map(node => node.position[1] + node.height));
        
        return {
            left,
            right,
            top,
            bottom,
            width: Math.abs(left - right),
            height:  Math.abs(top - bottom),
            getCenter: () => {
                return [
                    (left + right) / 2,
                    (top + bottom) / 2
                ];
            }
        };
    }

    static getConnectionPath(a, b, produce) {
        let { points, curve } = produce(...a, ...b);

        switch (curve) {
        case 'linear': curve = d3.curveLinear; break;
        case 'step': curve = d3.curveStep; break;
        case 'basis': curve = d3.curveBasis; break;
        default: curve = d3.curveBasis; break;
        }
        return this.pointsToPath(points, curve);
    }

    static pointsToPath(points, d3curve) {
        let curve = d3curve(d3.path());
        
        curve.lineStart();
        for (let i = 0; i < points.length;i++)
            curve.point(...points[i]);
        curve.lineEnd();

        return curve._context.toString();
    }

    static getOutputPosition(output: Output) {
        let node  = <Node>output.node;
        let el = output.el;

        return [
            node.position[0] + el.offsetLeft + el.offsetWidth / 2,
            node.position[1] + el.offsetTop + el.offsetHeight / 2
        ]
    }

    static getInputPosition(input: Input) {
        let node = <Node>input.node;
        let el = input.el;

        return [
            node.position[0] + el.offsetLeft + el.offsetWidth / 2,
            node.position[1] + el.offsetTop + el.offsetHeight / 2
        ]
    }

    static isValidData(data: any) {
        return typeof data.id === 'string' &&
            this.isValidId(data.id) &&
            data.nodes instanceof Object &&
            (!data.groups || data.groups instanceof Object)
    }

    static isValidId(id: any) {
        return /^[\w-]{3,}@[0-9]+\.[0-9]+\.[0-9]+$/.test(id);
    }

    static validate(id:any, data: any) {
        let msg = '';
        let id1 = id.split('@');
        let id2 = data.id.split('@');

        if (!this.isValidData(data))
            msg += 'Data is not suitable. '; 
        if (id !== data.id)
            msg += 'IDs not equal. ';
        if (id1[0] !== id2[0])
            msg += 'Names don\'t match. ';
        if (id1[1] !== id2[1])
            msg += 'Versions don\'t match';

        return { success: msg ==='', msg };
    }
}