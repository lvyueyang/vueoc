<template>
  <main style="background-color: #f2f2f2;height: 100vh;">
    <header-nav :type="'search'">发现</header-nav>
    <br>
    <div class="link-list">
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-zan"></i>
        <div class="content">
          <del>码云推荐</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-code"></i>
        <div class="content">
          <del>代码片段</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="/project/0" class="item">
        <i class="tit-icon iconfont icon-fenlei"></i>
        <div class="content">
          <div>开源软件</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="/post" class="item no-border">
        <i class="tit-icon iconfont icon-tiezi"></i>
        <div class="content">
          <div>帖子</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <br>
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-weizhi"></i>
        <div class="content">
          <del>附近的程序员</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="" class="item no-border">
        <i class="tit-icon iconfont icon-tuandui"></i>
        <div class="content">
          <del>线下活动</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import api from '../../common/js/api/api'

  export default {
    name: 'More',
    data() {
      return {
        info:{}
      }
    },
    components: {
      headerNav
    },
    computed: {

    },
    mounted() {
      this.getMYinfo();
    },
    methods: {
      getMYinfo(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.user.myindex, {
          'access_token': token
        }).then(res => {
          this.info = res.data;
        })
      }
    }
  }
</script>
<style>

</style>
