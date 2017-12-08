import { declareMenuDirectives } from './directives/index';
// @ts-ignore
import * as alight from 'alight'
import * as d3 from 'd3'
import * as pug from 'pug'
let template = pug.compileFile('./templates/menu.pug');

export default class ContextMenu {

    constructor(items: Object, searchBar: boolean = true) {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.default = {
            items,
            searchBar,
            onClick() { throw new TypeError('onClick should be overrided');}
        };

        this.bindTemplate(template());
    }

    visible: boolean;
    x: number;
    y: number;
    default: any;
    dom: any;
    $cd: any;
    items: any;
    searchBar: boolean;
    onClick: () => void;

    bindTemplate(t: string) {
        this.dom = d3.select('body').append('div');
        this.dom.node().setAttribute('tabindex', 1);
        this.dom.html(t);

        declareMenuDirectives(this, alight);
        this.$cd = alight(this.dom.node(), {contextMenu: this});
    }

    searchItems(filter: string = "") {
        let regex = new RegExp(filter, 'i'); 
        let items = {};

        Object.keys(this.items).forEach(key => {
            let item = this.items[key];

            if (item.constructor === Object) {
                let subitems = Object.keys(item).filter(subitem => regex.test(subitem))

                if (subitems.length > 0) {
                    items[key] = {};
                    subitems.forEach(sumitem => {
                        items[key][sumitem] = item[sumitem];
                    });
                }
            }
            else if (regex.test(key))
                items[key] = item;
        });

        return items;
    }

    haveSubitems(item: any) {
        return item.constructor === Object;
    }

    isVisible() {
        return this.visible;
    }

    show(x: number, y: number, items: Object | null = null, searchBar: boolean | null = null, onClick: () => void = () => undefined) {
        this.visible = true;
        this.items = items || this.default.items;
        this.searchBar = searchBar || this.default.searchBar;
        this.onClick = onClick || this.default.onClick;
        this.x = x;
        this.y = y;
        this.$cd.scan();
    }

    hide() {
        this.visible = false;
        this.$cd.scan();
    }
}