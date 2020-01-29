import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueMarkdown from 'vue-markdown'
import axios from 'axios'

// Vue.component(VueMarkdown, 'VueMarkdown');
Vue.component('VueMarkdown', VueMarkdown)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
