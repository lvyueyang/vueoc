<template>
  <nav class="footer-nav">
    <router-link to="/" >
      <i class="iconfont icon-zonghe"></i>
      <i class="iconfont icon-zonghe-active active"></i>
      <div>综合</div>
    </router-link>
    <router-link to="/tweet">
      <i class="iconfont icon-dongtan"></i>
      <i class="iconfont icon-dongtan-active active"></i>
      <div>动弹</div>
    </router-link>
    <router-link to="/tweetPub" class="tanyitan"><i class="iconfont icon-tanyitan"></i></router-link>
    <router-link to="/more">
      <i class="iconfont icon-faxian"></i>
      <i class="iconfont icon-faxian-active active"></i>
      <div>发现</div>
    </router-link>
    <router-link to="/admin">
      <i class="iconfont icon-admin"></i>
      <i class="iconfont icon-admin-active active"></i>
      <div>我的</div>
    </router-link>
  </nav>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'footer-nav',
    data(){
      return {

      }
    }
  }
</script>
<style lang="scss">

</style>
