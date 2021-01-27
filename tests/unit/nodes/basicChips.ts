import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'
import { Node, Flow } from '@/store/flows/types'
import uuid from 'uuid'
import BasicChip from '@/nodes/types/BasicChip'
import { IAndArgs } from '@/nodes/types/AND'
import { NodeTypeOptions, NodeTypeArgs, NodeTypeArgsDef } from '@/nodes/NodeType'
import { SimulationNode } from '@/store/simulation/types'

const localVue = createLocalVue()
localVue.use(Vuex)

export const tests_basicChips = () => {
    describe('CMD: basicChips', () => {
        let store: Store<RootState>
        let flow: Flow
        
        let prep = () => {
            // Setup Store
            store = new Store(storeDef())
            store.replaceState(storeDef().state as RootState)

            // Setup Default Flow
            const guid = uuid.v4()
            const filename = uuid.v4()
            const title = uuid.v4()
            flow = {guid, isProxy: false, filename, title, error: true, changed: false, connections:[], inputs: [], outputs: [], nodes: [] }

            store.dispatch('flows/createFlow', flow)
          
        }
      
        beforeEach(prep)

        
        interface ITest1Args extends NodeTypeArgs {
        }
        const ntTest1ArgTypes: NodeTypeArgsDef = {
        }
        class test1 extends BasicChip<ITest1Args> {
            constructor(overrides: NodeTypeOptions = {}){
                super({
                    title: "timestamp",
                    color: '#a6bbcf',
                    inputs: 0,
                    outputs: 1,
                    button: true,
                    ...overrides
                }, ntTest1ArgTypes)
            }

            getTitle(args: IAndArgs){
                return `${this.config.title}`
            }

            processLogic(nodeState: SimulationNode): boolean[] | null {
                return null
            }
        }

        it('In: 0, Out: 1', () => {
            /*
            <g class="red-ui-flow-node red-ui-flow-node-group" id="d8348889.c501b8" transform="translate(100,465)">
                <g transform="translate(-25,2)" class="red-ui-flow-node-button" opacity="1">
                    <rect class="red-ui-flow-node-button-background" rx="5" ry="5" width="32" height="26" fill-opacity="1"></rect>
                    <rect class="red-ui-flow-node-button-button" x="5" y="4" rx="4" ry="4" width="16" height="18" fill="#a6bbcf"
                        cursor="pointer" fill-opacity="1"></rect>
                </g>
                <rect class="red-ui-flow-node" rx="5" ry="5" fill="#a6bbcf" width="120" height="30"></rect>
                <g class="red-ui-flow-node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
                    <rect x="0" y="0" class="red-ui-flow-node-icon-shade" width="30" height="30"></rect>
                    <image xlink:href="icons/node-red/inject.svg" class="red-ui-flow-node-icon" x="0" width="30" height="30"
                        style="" y="0"></image>
                    <path d="M 30 1 l 0 28" class="red-ui-flow-node-icon-shade-border"></path>
                </g><text class="red-ui-flow-node-label" x="38" dy=".35em" text-anchor="start" y="14">timestamp</text>
                <g class="red-ui-flow-node-status-group" style="display: none;">
                    <rect class="red-ui-flow-node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
                    <text class="red-ui-flow-node-status-label" x="20" y="10"></text>
                </g>
                <g class="red-ui-flow-node-changed hide" transform="translate(110, -2)">
                    <circle r="5"></circle>
                </g>
                <g class="red-ui-flow-node-error hide" transform="translate(110, -2)">
                    <path d="M -5,4 l 10,0 -5,-8 z"></path>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(115,10)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
            </g>
            */
            let args = {guid:"ahs", x: 5, y: 23}
            let test = new test1();
            let test2 = new test1({
                icon: 'file'
            });
            expect(test.getOutputs(args)).to.equal(1, 'Output Count Wrong')
            expect(test.getInputs(args)).to.equal(0, 'Input Count Wrong')

            expect(test.getRootX(args, false)).to.equal(100, 'Root X Wrong')
            expect(test.getRootY(args, false)).to.equal(465, 'Root Y Wrong')

            expect(test.getWidth(args)).to.equal(100, 'Width Wrong')
            expect(test.getHeight(args)).to.equal(30, 'Height Wrong')
            
            expect(test.maxPinCount(args)).to.equal(1, 'maxPinCount Wrong')
            
            expect(test.yOffset(args)).to.equal(5, 'yOffset Wrong')

            expect(test.firstOutPinY(args)).to.equal(10, 'firstOutPinY Wrong')

            expect(test.getOutputX(args, 0, false)).to.equal(95, 'Output X Wrong')
            expect(test.getOutputY(args, 0, false)).to.equal(10, 'Output Y Wrong')

            expect(test.getOutputX(args, 0, true)).to.equal(100 + 95, 'Absolute Output X Wrong')
            expect(test.getOutputY(args, 0, true)).to.equal(465 + 10, 'Absolute Output Y Wrong')

            expect(test.getLabelX(args, false)).to.equal(8, 'Label wo/icon X Wrong')
            expect(test.getLabelY(args, false)).to.equal(14, 'Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, false)).to.equal(38, 'Label w/icon X Wrong')
            expect(test2.getLabelY(args, false)).to.equal(14, 'Label w/icon Y Wrong')

            expect(test.getLabelX(args, true)).to.equal(100 + 8, 'Absolute Label wo/icon X Wrong')
            expect(test.getLabelY(args, true)).to.equal(465 + 14, 'Absolute Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, true)).to.equal(100 + 38, 'Absolute Label w/icon X Wrong')
            expect(test2.getLabelY(args, true)).to.equal(465 + 14, 'Absolute Label w/icon Y Wrong')
        })

        it('In: 1, Out: 2', () => {
            /*
            <g class="red-ui-flow-node red-ui-flow-node-group" id="ac416745.118838" transform="translate(360,105)">
                <rect class="red-ui-flow-node" rx="5" ry="5" fill="#fdd0a2" width="100" height="30"></rect>
                <g class="red-ui-flow-node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
                    <rect x="0" y="0" class="red-ui-flow-node-icon-shade" width="30" height="30"></rect>
                    <image xlink:href="icons/node-red/function.svg" class="red-ui-flow-node-icon" x="0" width="30" height="30"
                        style="" y="0"></image>
                    <path d="M 30 1 l 0 28" class="red-ui-flow-node-icon-shade-border"></path>
                </g><text class="red-ui-flow-node-label" x="38" dy=".35em" text-anchor="start" y="14"></text>
                <g class="red-ui-flow-node-status-group" style="display: none;">
                    <rect class="red-ui-flow-node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
                    <text class="red-ui-flow-node-status-label" x="20" y="10"></text>
                </g>
                <g class="red-ui-flow-node-changed" transform="translate(90, -2)">
                    <circle r="5"></circle>
                </g>
                <g class="red-ui-flow-node-error hide" transform="translate(76, -2)">
                    <path d="M -5,4 l 10,0 -5,-8 z"></path>
                </g>
                <g class="red-ui-flow-port-input" transform="translate(-5,10)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,3.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,16.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
            </g>
            */
            let rx = 360
            let ry = 105
            let args = {guid:"ahs", x: 18, y: 5}
            let test = new test1({
                inputs: 1,
                outputs: 2
            });
            let test2 = new test1({
                inputs: 1,
                outputs: 2,
                icon: 'file'
            });
            expect(test.getOutputs(args)).to.equal(2, 'Output Count Wrong')
            expect(test.getInputs(args)).to.equal(1, 'Input Count Wrong')

            expect(test.getRootX(args, false)).to.equal(360, 'Root X Wrong')
            expect(test.getRootY(args, false)).to.equal(105, 'Root Y Wrong')

            expect(test.getWidth(args)).to.equal(100, 'Width Wrong')
            expect(test.getHeight(args)).to.equal(30, 'Height Wrong')
            
            expect(test.maxPinCount(args)).to.equal(2, 'maxPinCount Wrong')
            
            expect(test.yOffset(args)).to.equal(5, 'yOffset Wrong')

            expect(test.firstInPinY(args)).to.equal(10, 'firstInPinY Wrong')
            expect(test.firstOutPinY(args)).to.equal(3.5, 'firstOutPinY Wrong')

            expect(test.getInputX(args, 0, false)).to.equal(-5, 'Input X Wrong')
            expect(test.getInputY(args, 0, false)).to.equal(10, 'Input Y Wrong')

            expect(test.getInputX(args, 0, true)).to.equal(rx + -5, 'Absolute Input X Wrong')
            expect(test.getInputY(args, 0, true)).to.equal(ry + 10, 'Absolute Input Y Wrong')

            expect(test.getOutputX(args, 0, false)).to.equal(95, 'Output X Wrong')
            expect(test.getOutputY(args, 0, false)).to.equal(3.5, 'Output Y Wrong')

            expect(test.getOutputX(args, 0, true)).to.equal(rx + 95, 'Absolute Output X Wrong')
            expect(test.getOutputY(args, 0, true)).to.equal(ry + 3.5, 'Absolute Output Y Wrong')

            expect(test.getOutputX(args, 1, false)).to.equal(95, 'Output X Wrong')
            expect(test.getOutputY(args, 1, false)).to.equal(16.5, 'Output Y Wrong')

            expect(test.getOutputX(args, 1, true)).to.equal(rx + 95, 'Absolute Output X Wrong')
            expect(test.getOutputY(args, 1, true)).to.equal(ry + 16.5, 'Absolute Output Y Wrong')

            expect(test.getLabelX(args, false)).to.equal(8, 'Label wo/icon X Wrong')
            expect(test.getLabelY(args, false)).to.equal(14, 'Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, false)).to.equal(38, 'Label w/icon X Wrong')
            expect(test2.getLabelY(args, false)).to.equal(14, 'Label w/icon Y Wrong')

            expect(test.getLabelX(args, true)).to.equal(rx + 8, 'Absolute Label wo/icon X Wrong')
            expect(test.getLabelY(args, true)).to.equal(ry + 14, 'Absolute Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, true)).to.equal(rx + 38, 'Absolute Label w/icon X Wrong')
            expect(test2.getLabelY(args, true)).to.equal(ry + 14, 'Absolute Label w/icon Y Wrong')
        })

        it('In: 1, Out: 5', () => {
            /*
            <g class="red-ui-flow-node red-ui-flow-node-group" id="ac416745.118838" transform="translate(140,62.5)">
                <rect class="red-ui-flow-node" rx="5" ry="5" fill="#fdd0a2" width="100" height="75"></rect>
                <g class="red-ui-flow-node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
                    <rect x="0" y="0" class="red-ui-flow-node-icon-shade" width="30" height="75"></rect>
                    <image xlink:href="icons/node-red/function.svg" class="red-ui-flow-node-icon" x="0" width="30" height="30"
                        style="" y="22.5"></image>
                    <path d="M 30 1 l 0 73" class="red-ui-flow-node-icon-shade-border"></path>
                </g><text class="red-ui-flow-node-label" x="38" dy=".35em" text-anchor="start" y="36.5"></text>
                <g class="red-ui-flow-node-status-group" style="display: none;">
                    <rect class="red-ui-flow-node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
                    <text class="red-ui-flow-node-status-label" x="20" y="10"></text>
                </g>
                <g class="red-ui-flow-node-changed" transform="translate(90, -2)">
                    <circle r="5"></circle>
                </g>
                <g class="red-ui-flow-node-error hide" transform="translate(76, -2)">
                    <path d="M -5,4 l 10,0 -5,-8 z"></path>
                </g>
                <g class="red-ui-flow-port-input" transform="translate(-5,32.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,6.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,19.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,32.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,45.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,58.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
            </g>
            */
            let rx = 140
            let ry = 62.5
            let args = {guid:"ahs", x: 7, y: 3}
            let test = new test1({
                inputs: 1,
                outputs: 5
            });
            let test2 = new test1({
                inputs: 1,
                outputs: 5,
                icon: 'file'
            });
            expect(test.maxPinCount(args)).to.equal(5, 'maxPinCount Wrong')
            
            expect(test.getOutputs(args)).to.equal(5, 'Output Count Wrong')
            expect(test.getInputs(args)).to.equal(1, 'Input Count Wrong')
            
            expect(test.getWidth(args)).to.equal(100, 'Width Wrong')
            expect(test.getHeight(args)).to.equal(75, 'Height Wrong')

            expect(test.yOffset(args)).to.equal(2.5, 'yOffset Wrong')

            expect(test.getRootX(args, false)).to.equal(rx, 'Root X Wrong')
            expect(test.getRootY(args, false)).to.equal(ry, 'Root Y Wrong')

            expect(test.firstOutPinY(args)).to.equal(6.5, 'firstOutPinY Wrong')
            expect(test.firstInPinY(args)).to.equal(32.5, 'firstInPinY Wrong')

            expect(test.getInputX(args, 0, false)).to.equal(-5, 'Input X Wrong')
            expect(test.getInputY(args, 0, false)).to.equal(32.5, 'Input Y Wrong')

            expect(test.getInputX(args, 0, true)).to.equal(rx + -5, 'Absolute Input X Wrong')
            expect(test.getInputY(args, 0, true)).to.equal(ry + 32.5, 'Absolute Input Y Wrong')

            const checkOutput = (index: number, y: number)=>{
                expect(test.getOutputX(args, index, false)).to.equal(95, `Output #${index} X Wrong`)
                expect(test.getOutputY(args, index, false)).to.equal(y, `Output #${index} Y Wrong`)
    
                expect(test.getOutputX(args, index, true)).to.equal(rx + 95, `Absolute Output #${index} X Wrong`)
                expect(test.getOutputY(args, index, true)).to.equal(ry + y, `Absolute Output #${index} Y Wrong`)
            }

            checkOutput(0, 6.5)
            checkOutput(1, 19.5)
            checkOutput(2, 32.5)
            checkOutput(3, 45.5)
            checkOutput(4, 58.5)

            expect(test.getLabelX(args, false)).to.equal(8, 'Label wo/icon X Wrong')
            expect(test.getLabelY(args, false)).to.equal(36.5, 'Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, false)).to.equal(38, 'Label w/icon X Wrong')
            expect(test2.getLabelY(args, false)).to.equal(36.5, 'Label w/icon Y Wrong')

            expect(test.getLabelX(args, true)).to.equal(rx + 8, 'Absolute Label wo/icon X Wrong')
            expect(test.getLabelY(args, true)).to.equal(ry + 36.5, 'Absolute Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, true)).to.equal(rx + 38, 'Absolute Label w/icon X Wrong')
            expect(test2.getLabelY(args, true)).to.equal(ry + 36.5, 'Absolute Label w/icon Y Wrong')
        })

        it('In: 5, Out: 1', () => {
            /*
            <g class="red-ui-flow-node red-ui-flow-node-group" id="ac416745.118838" transform="translate(140,62.5)">
                <rect class="red-ui-flow-node" rx="5" ry="5" fill="#fdd0a2" width="100" height="75"></rect>
                <g class="red-ui-flow-node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
                    <rect x="0" y="0" class="red-ui-flow-node-icon-shade" width="30" height="75"></rect>
                    <image xlink:href="icons/node-red/function.svg" class="red-ui-flow-node-icon" x="0" width="30" height="30"
                        style="" y="22.5"></image>
                    <path d="M 30 1 l 0 73" class="red-ui-flow-node-icon-shade-border"></path>
                </g><text class="red-ui-flow-node-label" x="38" dy=".35em" text-anchor="start" y="36.5"></text>
                <g class="red-ui-flow-node-status-group" style="display: none;">
                    <rect class="red-ui-flow-node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
                    <text class="red-ui-flow-node-status-label" x="20" y="10"></text>
                </g>
                <g class="red-ui-flow-node-changed" transform="translate(90, -2)">
                    <circle r="5"></circle>
                </g>
                <g class="red-ui-flow-node-error hide" transform="translate(76, -2)">
                    <path d="M -5,4 l 10,0 -5,-8 z"></path>
                </g>
                <g class="red-ui-flow-port-input" transform="translate(-5,32.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,6.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,19.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,32.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,45.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
                <g class="red-ui-flow-port-output" transform="translate(95,58.5)">
                    <rect class="red-ui-flow-port" rx="3" ry="3" width="10" height="10"></rect>
                </g>
            </g>
            */
            let rx = 140
            let ry = 62.5
            let args = {guid:"ahs", x: 7, y: 3}
            let test = new test1({
                inputs: 5,
                outputs: 1
            });
            let test2 = new test1({
                inputs: 5,
                outputs: 1,
                icon: 'file'
            });
            expect(test.maxPinCount(args)).to.equal(5, 'maxPinCount Wrong')
            
            expect(test.getOutputs(args)).to.equal(1, 'Output Count Wrong')
            expect(test.getInputs(args)).to.equal(5, 'Input Count Wrong')
            
            expect(test.getWidth(args)).to.equal(100, 'Width Wrong')
            expect(test.getHeight(args)).to.equal(75, 'Height Wrong')

            expect(test.yOffset(args)).to.equal(2.5, 'yOffset Wrong')

            expect(test.getRootX(args, false)).to.equal(rx, 'Root X Wrong')
            expect(test.getRootY(args, false)).to.equal(ry, 'Root Y Wrong')

            expect(test.firstOutPinY(args)).to.equal(32.5, 'firstOutPinY Wrong')
            expect(test.firstInPinY(args)).to.equal(6.5, 'firstInPinY Wrong')

            expect(test.getOutputX(args, 0, false)).to.equal(95, 'Output X Wrong')
            expect(test.getOutputY(args, 0, false)).to.equal(32.5, 'Output Y Wrong')

            expect(test.getOutputX(args, 0, true)).to.equal(rx + 95, 'Absolute Output X Wrong')
            expect(test.getOutputY(args, 0, true)).to.equal(ry + 32.5, 'Absolute Output Y Wrong')

            const checkInput = (index: number, y: number)=>{
                expect(test.getInputX(args, index, false)).to.equal(-5, `Input #${index} X Wrong`)
                expect(test.getInputY(args, index, false)).to.equal(y, `Input #${index} Y Wrong`)
    
                expect(test.getInputX(args, index, true)).to.equal(rx - 5, `Absolute Input #${index} X Wrong`)
                expect(test.getInputY(args, index, true)).to.equal(ry + y, `Absolute Input #${index} Y Wrong`)
            }

            checkInput(0, 6.5)
            checkInput(1, 19.5)
            checkInput(2, 32.5)
            checkInput(3, 45.5)
            checkInput(4, 58.5)

            expect(test.getLabelX(args, false)).to.equal(8, 'Label wo/icon X Wrong')
            expect(test.getLabelY(args, false)).to.equal(36.5, 'Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, false)).to.equal(38, 'Label w/icon X Wrong')
            expect(test2.getLabelY(args, false)).to.equal(36.5, 'Label w/icon Y Wrong')

            expect(test.getLabelX(args, true)).to.equal(rx + 8, 'Absolute Label wo/icon X Wrong')
            expect(test.getLabelY(args, true)).to.equal(ry + 36.5, 'Absolute Label wo/icon Y Wrong')

            expect(test2.getLabelX(args, true)).to.equal(rx + 38, 'Absolute Label w/icon X Wrong')
            expect(test2.getLabelY(args, true)).to.equal(ry + 36.5, 'Absolute Label w/icon Y Wrong')
        })
      })
}