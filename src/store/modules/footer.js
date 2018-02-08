export default {
  state:{
    show:true
  },
  mutations:{
    footerhide(state){
      state.show = false;
    },
    footershow(state){
      state.show = true;
    }
  }
}
