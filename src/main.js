import Vue from 'vue';
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import { BForm } from 'bootstrap-vue';
import store from './store';
import App from './App.vue';

// Required dependency of bootstrap css/scss files
import 'bootstrap/scss/bootstrap.scss';

// Global registration
Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap);
Vue.component('b-form', BForm);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
