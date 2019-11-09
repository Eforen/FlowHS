<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      class="titlebar"
    >
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
      FlowHS v0.2

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
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<style lang="css">

.titlebar {
  -webkit-user-select: none !important;
  -webkit-app-region: drag !important;
}

.titlebar .title {
}

.titlebar .button {
  -webkit-app-region: no-drag !important;
}

</style>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import {ipcRenderer} from 'electron'

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),

  methods: {
    closeWindow: () => {
      ipcRenderer.sendSync("closeWindow", "main")
    },

    minWindow: () => {
      ipcRenderer.sendSync("minWindow", "main")
    },
  }
});
</script>
