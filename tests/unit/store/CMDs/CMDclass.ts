import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Vuex, { Store } from 'vuex'
import { storeDef } from '@/store'
import { RootState } from '@/store/types'
import Command from '@/store/commands/Command'

class tester extends Command {
    constructor(public target: number){
        super()
    }
    oldValue: number | null = null

    shortDesc(): string {
        return `Test Command`
    }
    exe(dispatch: any, state: any): void {
        this.oldValue = state.target1
        state.target1 = this.target
    }
    undo(dispatch: any, state: any): void {
        state.target1 = this.oldValue
        this.oldValue = null
    }
    clone(): Command {
        throw new Error("Method not implemented.");
    }
    canMerge(that: Command): Boolean {
        throw new Error("Method not implemented.");
    }
    merge(that: Command): Command {
        throw new Error("Method not implemented.");
    }


}

export const tests_CMDclass = () => {
    describe('CMD: Baseclass', () => {
        //let getters
      
        beforeEach(() => {
        })
      
        it('Do Undo', () => {
            const randomnum = Math.random()
            const targetnum = Math.random()
            let testtarget = {
                target1:randomnum,
                target2:randomnum
            }
            let test = new tester(targetnum);
            test.exe(null, testtarget)
            expect(testtarget).to.deep.equal({
                target1:targetnum,
                target2:randomnum
            })
            test.undo(null, testtarget)
            expect(testtarget).to.deep.equal({
                target1:randomnum,
                target2:randomnum
            })
        })
        it.skip('undo Can\'t be run before exe')
        it.skip('exe Can\'t be run twice without first runing undo')
        it.skip('undo Can\'t be run twice without first runing exe')
      })
}