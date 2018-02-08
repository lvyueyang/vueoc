export default {
  state:{
    openID:'',
    openKEY:'',
    callback:'',
    appINDEX:'',
    access_token:''
  },
  mutations:{
    tikenset(state,token){
      state.access_token = token;
    }
  }
}
