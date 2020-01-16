import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import "./registerServiceWorker";

import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";

//Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
