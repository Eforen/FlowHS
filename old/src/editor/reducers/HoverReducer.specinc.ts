import { expect } from 'chai';
import { describe } from 'mocha';
import { EditorStateDefault } from '../state/editorState';
import { HoverStateDefault } from '../state/HoverState';
import { makeActionHoverStart, makeActionHoverEnd } from '../actions/hoverActions';
import { HoverReducer } from './HoverReducer';

describe('HoverReducers', () => {
    it('Hover when no node selected', () => {
        let test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: []
            }
        }
        let result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 12,
                    input: true,
                    connector: 74
                }]
            }
        }
        expect(HoverReducer(test, makeActionHoverStart(12, true, 74))).to.deep.equal(result)
        
        result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 25,
                    input: false,
                    connector: 47
                }]
            }
        }
        expect(HoverReducer(test, makeActionHoverStart(25, false, 47))).to.deep.equal(result)
    })


    it('Hover when node selected', () => {
        let test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 12,
                    input: true,
                    connector: 74
                }]
            }
        }
        let result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                        node: 12,
                        input: true,
                        connector: 74
                    }, {
                        node: 734,
                        input: false,
                        connector: 23
                    }]
            }
        }
        expect(HoverReducer(test, makeActionHoverStart(734, false, 23))).to.deep.equal(result)

        let result2 = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                        node: 12,
                        input: true,
                        connector: 74
                    }, {
                        node: 734,
                        input: false,
                        connector: 23
                    }, {
                        node: 233,
                        input: true,
                        connector: 7894
                    }]
            }
        }
        expect(HoverReducer(result, makeActionHoverStart(233, true, 7894))).to.deep.equal(result2)
    })




    it('Unhover when multiple nodes selected', () => {
        let test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 25,
                    input: false,
                    connector: 47
                }, {
                    node: 734,
                    input: false,
                    connector: 23
                }, {
                    node: 233,
                    input: true,
                    connector: 7894
                }]
            }
        }
        let result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 25,
                    input: false,
                    connector: 47
                }, {
                    node: 233,
                    input: true,
                    connector: 7894
                }]
            }
        }
        expect(HoverReducer(test, makeActionHoverEnd(734, false, 23))).to.deep.equal(result)

        let result2 = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 233,
                    input: true,
                    connector: 7894
                }]
            }
        }
        expect(HoverReducer(result, makeActionHoverEnd(25, false, 47))).to.deep.equal(result2)
    })

    it('Unhover when node selected', () => {
        let test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 12,
                    input: true,
                    connector: 74
                }]
            }
        }
        let result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: []
            }
        }
        expect(HoverReducer(test, makeActionHoverEnd(12, true, 74))).to.deep.equal(result)

        test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: [{
                    node: 25,
                    input: false,
                    connector: 47
                }]
            }
        }
        expect(HoverReducer(test, makeActionHoverEnd(25, false, 47))).to.deep.equal(result)
    })

    it('Unhover when not node selected', () => {
        let test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: []
            }
        }
        let result = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: []
            }
        }
        expect(HoverReducer(test, makeActionHoverEnd(12, true, 74))).to.deep.equal(result)

        test = {
            ...EditorStateDefault,
            hover: {
                ...HoverStateDefault,
                hovering: []
            }
        }
        expect(HoverReducer(test, makeActionHoverEnd(25, false, 47))).to.deep.equal(result)
    })
})