<template>
  <v-app :class="`APP-${whatAmI.toUpperCase()}`">
    <v-app-bar
      app
      color="primary"
      dark
      dense
      class="titlebar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!--
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="20"
        />
      </div>
      -->
      FlowHS (Hardware Simulator)

      <v-spacer></v-spacer>

      <v-btn
        class="button"
        target="_blank"
        text
        icon
        small
        v-on:click="minWindow"
      >
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn
        class="button"
        target="_blank"
        text
        icon
        small
        v-on:click="closeWindow"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-progress-circular
        v-if="whatAmI=='u'"
        :size="100"
        :width="12"
        color="purple"
        indeterminate/>
      <v-progress-circular
        v-if="whatAmI=='u'"
        :size="100"
        :width="6"
        color="blue"
        indeterminate/>
      <Editor v-else-if="whatAmI=='e'"/>
      <div v-else-if="whatAmI=='s'">Simulator Placeholder</div>
    </v-content>
  </v-app>
</template>

<style lang="css">

.titlebar {
  -webkit-user-select: none !important;
  -webkit-app-region: drag !important;
  /*position: static !important;*/
}

.titlebar .title {
}

.titlebar .v-btn {
  -webkit-app-region: no-drag !important;
}

.v-application > .v-application--wrap > .v-content {
  height: calc(100vh - 48px)
}
body::-webkit-scrollbar {
  display: none;
  overflow: hidden;
}

.APP-U .v-progress-circular {
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}

.APP-U .v-content__wrap {
  background: #434954;
}
</style>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Navigation from './components/Navigation.vue';
import Editor from './Editor.vue';
import {ipcRenderer} from 'electron'
import Component from 'vue-class-component';
import ApplicationType from './ApplicationType'

@Component({
  components: {
    Editor
  } 
})
export default class App extends Vue {
  whatAmI: ApplicationType = ApplicationType.TBD

  closeWindow(){
    ipcRenderer.sendSync("closeWindow", "main")
  }

  minWindow(){
    ipcRenderer.sendSync("minWindow", "main")
  }

  mounted(){
    this.whatAmI = ipcRenderer.sendSync("whatAmI")
    console.log(`I am a ${this.whatAmI} window`)
  }
}
</script>
