let p = (v) => parseInt(v);
let eqArr = (ar1, ar2) => ar1.every((v, i) => v === ar2[i]);
let eqObj = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);
let eqCon = (c1, c2, target) => {
    return c1.node === c2.node && c1[target] === c2[target];
}
let diffCons = (cons1, cons2) => {

    let removed = cons1.filter(c1 => !cons2.some(c2 => eqCon(c1, c2, 'input')));
    let added = cons2.filter(c2 => !cons1.some(c1 => eqCon(c1, c2, 'input')));
    
    return {removed, added}
}

export default class Diff {

    a: any;
    b: any;
    constructor(data1, data2) {
        this.a = data1;
        this.b = data2;
    }

    compare() {
        let a = this.a;
        let b = this.b;

        let k1 = Object.keys(a.nodes);
        let k2 = Object.keys(b.nodes);

        let removed = k1.filter(k => !k2.includes(k)).map(p);
        let added = k2.filter(k => !k1.includes(k)).map(p);
        let stayed = k1.filter(k => k2.includes(k)).map(p);

        let moved = stayed.filter(id => {
            let p1 = a.nodes[id].position;
            let p2 = b.nodes[id].position;

            return !eqArr(p1, p2)
        });

        let datachanged = stayed.filter(id => {
            let d1 = a.nodes[id].data;
            let d2 = b.nodes[id].data;

            return !eqObj(d1, d2);
        });

        let connects = stayed.reduce((arr, id) => {
            let o1 = a.nodes[id].outputs;
            let o2 = b.nodes[id].outputs;

            let output = o1.map((out, i) => {
                return Object.assign({output: i}, diffCons(out.connections, o2[i].connections))
            }).filter(diff => diff.added.length !== 0 || diff.removed.length !== 0);

            return [...arr, ...output.map(o => (o.node = id, o))];
        }, [])

        return {removed, added, moved, datachanged, connects}
    }
}