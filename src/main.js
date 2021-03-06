import Vue from 'vue';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// cookies
import VueCookies from 'vue-cookies';
// jquery
import jquery from 'jquery';
// bootstrap
import 'bootstrap';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// vee-validate
import {
  ValidationObserver,
  ValidationProvider,
  configure,
  localize,
  extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'; // 驗證規則
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系

import App from './App.vue';
import router from './router';

window.$ = jquery;

Vue.use(VueAxios, axios);

Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.component('Loading', Loading);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('tw', zhTW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

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
