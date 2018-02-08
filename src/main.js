// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store/index'
import filters from './common/js/filters'
import rem from './common/js/rem'
import popMsg from './components/pop/msg/msg'
import iframModal from './components/iframe-modal/index.js'

//rem
rem();
axios.defaults.baseURL = 'https://bird.ioliu.cn/v1?url=https://www.oschina.net/';
axios.interceptors.request.use(config => {
  if (!localStorage.getItem('access_token') || localStorage.getItem('access_token') === '' || localStorage.getItem('access_token').length === 0 ) {
      router.push('/login');
  }
  return config;
});

//关闭生产模式下给出的提示
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);
Vue.use(popMsg);
Vue.use(iframModal);
Vue.prototype.$http = axios;
Vue.prototype.$popMsg = popMsg;
Vue.prototype.$iframModal = iframModal;

//筛选
Vue.filter('format', function (value) {
  return filters.format(value);
});
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
router.beforeEach((to, from, next) => {
  if (to.meta.nofooternav) {
    store.commit('footerhide')
  } else {
    store.commit('footershow')
  }
  next();
});


