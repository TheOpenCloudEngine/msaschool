import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import Meta from 'vue-meta';
Vue.use(Meta);
// Vue.component(VueMarkdown, 'VueMarkdown');
Vue.component('VueMarkdown', VueMarkdown)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) },
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
