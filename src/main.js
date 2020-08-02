import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import jquery from 'jquery';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';

window.$ = jquery;
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.config.productionTip = false;

Vue.component('Loading', Loading);

Vue.mixin({
  methods: {
    setAxiosAuthorization() {
      const token = this.$cookies.get('token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
  },
});

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
