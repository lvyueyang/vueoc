<template>
  <main class="admin-my-info">
    <header-nav>设置</header-nav>
    <!--设置列表-->
    <div class="link-list myinfo">
      <div class="item" @click="quit">
        <div class="content">
          <div>退出</div>
          <i class="iconfont icon-more"></i>
        </div>
      </div>
    </div>
    <div class="link-list myinfo">
      <router-link to="/zuoZhe" class="item no-border">
        <div class="content">
          <div>关于作者</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'

  export default {
    name: 'MySet',
    data() {
      return {}
    },
    components: {
      headerNav
    },
    computed: {},
    mounted() {
      this.$store.commit('footerhide');
    },
    methods: {
      quit(){
        localStorage.setItem('access_token', '');
        this.$router.push('/login');
      }
    }
  }
</script>
<style>

</style>
