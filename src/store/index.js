import Vue from 'vue'
import Vuex from 'vuex'
import msg from './modules/msg-modal'
import openInfo from './modules/openInfo'
import footernav from  './modules/footer'
import tweet from  './modules/tweet'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    msg,
    footernav,
    tweet,
    openInfo
  }
})
