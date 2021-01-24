<template>
  <v-container>
    Simulator Placeholder
  </v-container>
</template>

<style lang="css" scoped>
  .v-content__wrap {
    background: #434954;
  }
</style>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';
import { State, Action, Getter } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator'
import { NotificationState } from './store/notification/types';
import { IRelayArgs } from './nodes/types/RELAY';
import { INotArgs } from './nodes/types/NOT';
import { IOrArgs } from './nodes/types/OR';
import { IXnorArgs } from './nodes/types/XNOR';
import { INandArgs } from './nodes/types/NAND';
import { IXorArgs } from './nodes/types/XOR';
import { SimulationState } from './store/simulation/types';

@Component({
  components: {
  } 
})
export default class Simulator extends Vue {

  @State('simulaton') simulaton!: SimulationState

  created(){
  }

  destroyed(){
  }

  debug: MouseEvent | null = null
  debugMode: string = 'none'
}
</script>
