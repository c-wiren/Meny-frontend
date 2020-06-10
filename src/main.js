import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMeta from 'vue-meta'

import 'sweetalert2/dist/sweetalert2.min.css';


import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

import store from './store'
import './registerServiceWorker'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)
Vue.use(VueSweetalert2, {
  customClass: {
    confirmButton: 'btn btn-primary mx-1 mw-5',
    cancelButton: 'btn btn-outline-secondary mx-1 mw-5',
    popup: 'rounded shadow-lg',
  },
  buttonsStyling: false,
  cancelButtonText: "Avbryt"

});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')