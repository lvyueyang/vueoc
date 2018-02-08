export default {
  state:{
      show:false
  },
  mutations:{
    toggle(state){
      state.show = true;
      setTimeout(() =>{
        state.show = false;
      })
    }
  }
}
