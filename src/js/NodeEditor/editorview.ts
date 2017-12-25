import ContextMenu from './contextmenu';
import Component from './component';
import Node from './node';
import NodeEditor from './editor';
import Utils from './utils';
import { declareViewDirectives } from './directives/index';
import Output from './output';
import * as d3 from 'd3';
import alight from 'alight'

import * as pug from 'pug'
import { ZoomTransform, ZoomBehavior } from 'd3';
let template = pug.compileFile('./src/js/NodeEditor/templates/view.pug');

const zoomMargin = 0.9;

export default class EditorView {

    pickedOutput: Output | null;
    container: any;
    mouse: number[];
    transform: ZoomTransform;
    contextMenu: ContextMenu;
    view: any;
    zoom: ZoomBehavior<Element, {}>;
    $cd: any;

    constructor(public editor: NodeEditor, container: HTMLElement, public menu: ContextMenu) {
        //this.editor = editor;
        this.pickedOutput = null;
        this.container = <HTMLElement><any><any>d3.select(container).attr('tabindex', 1);
        this.mouse = [0, 0];
        this.transform = d3.zoomIdentity;

        this.contextMenu = menu;

        this.container
            .on('click', () => {
                if (this.container.node() === d3.event.target)
                    this.areaClick()
            });

        this.view = this.container.append('div')
            .style('transform-origin', '0 0')
            .style('width', 1)
            .style('height', 1);

        this.zoom = d3.zoom()
            .on('zoom', () => {
                this.transform = d3.event.transform;
                this.update();
                this.editor.eventListener.trigger('transform', this.transform);
            });

        this.container.call(this.zoom);

        this.setScaleExtent(0.1, 1);
        let size = Math.pow(2, 12);

        this.setTranslateExtent(-size, -size, size, size);

        d3.select(window)
            .on('mousemove.d3ne' + editor._id, () => {
                
                let k = this.transform.k;
                let position = d3.mouse(this.view.node());

                this.mouse = [position[0] / k, position[1] / k];
                this.update();
            })
            .on('keydown.d3ne' + editor._id, (e) => {
                if (this.container.node() === document.activeElement)
                    editor.keyDown(e);
            })
            .on('resize.d3ne' + editor._id, this.resize.bind(this));

        this.view.html(template());

        let al = alight.makeInstance();

        declareViewDirectives(this, al);
        this.$cd = al(this.view.node(), {editor});
    }

    getTemplate(node) {
        let component = this.editor.components.find(c => {
            return c.name === node.title
        });

        return component.template;
    }

    resize() {
        let width = this.container.node().parentElement.clientWidth;
        let height = this.container.node().parentElement.clientHeight;

        this.container
            .style('width', width + 'px')
            .style('height', height + 'px');

        this.update();
    }

    connectionProducer(x1, y1, x2, y2) {
        let offsetX = 0.3 * Math.abs(x1 - x2);
        let offsetY = 0.1 * (y2 - y1);

        let p1 = [x1, y1];
        let p2 = [x1 + offsetX, y1 + offsetY];
        let p3 = [x2 - offsetX, y2 - offsetY];
        let p4 = [x2, y2];

        return {
            points: [p1, p2, p3, p4],
            curve: 'basis'
        };
    }

    updateConnections() {
        let pathData = [];

        this.editor.nodes.forEach(node => {
            node.getConnections('output').forEach(con => {
                let output = con.output;
                let input = con.input;

                if (input.el) {
                    pathData.push({
                        connection: con,
                        d: Utils.getConnectionPath(
                            Utils.getOutputPosition(output),
                            Utils.getInputPosition(input),
                            this.connectionProducer
                        )
                    });
                }
            });
        });

        if (this.pickedOutput !== null && this.pickedOutput.el) {
            let output = this.pickedOutput;
            let input = this.mouse;

            pathData.push({
                selected: true,
                d: Utils.getConnectionPath(
                    Utils.getOutputPosition(output),
                    input,
                    this.connectionProducer
                )
            });
        }

        this.editor.paths = pathData;
    }

    update() {
        let t = this.transform;
        
        this.view.style('transform', `translate(${t.x}px, ${t.y}px) scale(${t.k})`);
        this.updateConnections();
        this.$cd.scan();
    }

    assignContextMenuHandler() {
        this.contextMenu.default.onClick = async (item) => {
        
            if (item instanceof Component) {
                let node = item.newNode();

                await item.builder(node);
                this.editor.addNode(node, true);
                this.editor.selectNode(node);
            }
            else
                item();

            this.contextMenu.hide();
        };
    }    

    areaClick() {
        if (this.editor.readOnly) return;
        
        if (this.pickedOutput !== null && !d3.event.ctrlKey)
            this.pickedOutput = null;
        else if (this.contextMenu.visible)
            this.contextMenu.hide();
        else {
            this.assignContextMenuHandler();
            this.contextMenu.show(d3.event.pageX, d3.event.pageY);
        }
        this.update();
    }

    zoomAt(nodes: Node[]) {
        if (nodes.length === 0) return;

        let w = this.container.node().clientWidth;
        let h = this.container.node().clientHeight;
        let bbox = Utils.nodesBBox(nodes);
        let kw = w / bbox.width;
        let kh = h / bbox.height;
        let k = Math.min(kh, kw, 1);

        let center = bbox.getCenter();
        let win = [w / 2, h / 2];
        
        k *= zoomMargin;

        this.translate(win[0] - center[0] * k, win[1] - center[1] * k);
        this.scale(k);
    }

    translate(x, y) {
        this.translate(x, y);
        this.update();
    }

    scale(scale) {
        this.transform.scale = scale;
        this.update();
    }

    setScaleExtent(scaleMin: number, scaleMax: number) {
        this.zoom.scaleExtent([scaleMin, scaleMax]);
    }

    setTranslateExtent(left: number, top: number, right: number, bottom: number) {
        this.zoom.translateExtent([[left, top], [right, bottom]]);
    }
}