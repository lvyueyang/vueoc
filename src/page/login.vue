<template>
  <main class="login-view">
    <header class="login-header">
      <span @click="$router.go(-1)"><i class="iconfont icon-back"></i></span>
    </header>
    <div class="text-center login-logo">
      Vue-OC
    </div>
    <div class="inp">
      <label for=""><i class="iconfont icon-admin"></i></label>
      <input type="text" placeholder="请输入access_token" v-model="token">
    </div>
    <button class="btn login" @click="login">登陆</button>
    <div class="link">
      <span @click="getToken">点此获取access_token</span>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'Login',
    data() {
      return {
        token:'037aacb9-c5e5-4c01-8db9-5a04bc2cfa5d'
      }
    },
    components: {},
    computed: {},
    mounted() {
      //获取自己的token简单的用了一下easy-mock的模拟
      this.$http.get('https://easy-mock.com/mock/59014460875d7232a38b2d72/example/token').then(res =>{
        this.token = res.data.token;
      });
      this.$store.commit('footerhide');
      this.$popMsg.show('你可以使用默认token登陆体验，也可以使用点击下方获取token替换为你自己的token登陆',2000)
    },
    methods: {
      getToken(){
        const src = 'https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=oW2z1yzaBkJXI0yHUBNY&redirect_uri=http://lvyueyang.top/OCVUE/index.html';
        this.$iframeModal.show(src);
      },
      login(){
        localStorage.setItem('access_token', this.token);
        this.$router.replace('/');
      },
      get(){

      }
    }
  }
</script>
<style>

</style>
