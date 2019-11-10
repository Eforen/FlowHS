import Vue from 'vue'
import App from './App.vue'
import Editor from './Editor.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import GetAppMode from './util/GetMode';


Vue.config.productionTip = false

//Store App Mode
switch (GetAppMode()) {
  case 'editor':
      new Vue({
        store,
        vuetify,
        render: h => h(Editor)
      }).$mount('#app')
    break;

  default:
    new Vue({
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
    break;
}

