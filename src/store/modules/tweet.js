export default {
  state:{
    info:{}
  },
  mutations:{
    addTweet(state,obj){
      state.info = obj;
    }
  }
}
