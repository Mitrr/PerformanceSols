import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Card from "./components/ui/Card";

Vue.config.productionTip = false;
Vue.component('Card',Card);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
