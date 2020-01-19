import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/vuex";
import VueLazyload from "vue-lazyload";

import FastClick from "fastclick";

import toast from "components/common/toast"

Vue.config.productionTip = false;

//安装toast插件
Vue.use(toast);
//FastClick解决移动端点击300ms延迟
FastClick.attach(document.body);

//Vue实例可以做为事件总线
Vue.prototype.$bus = new Vue();

//安装VueLazyload插件
Vue.use(VueLazyload, {
  // loading: require("./assets/img/common/placeholder.png"),

});

new Vue({

  router,
  store,
  render: h => h(App),
}).$mount('#app')

//

