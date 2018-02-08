<template>
  <main class="admin-home-view">
    <header-nav :type="'admin'"></header-nav>
    <!--用户信息-->
    <div class="my-info-wrapper">
      <!--头像-->
      <div class="touxiang">
        <img :src="info.portrait" alt="">
        <div class="sex nan" v-if="info.gender === 1">
          <i class="iconfont icon-nan"></i>
        </div>
        <div class="sex nv" v-if="info.gender === 2">
          <i class="iconfont icon-nv"></i>
        </div>
      </div>
      <!--用户名-->
      <div class="username">{{info.name}}</div>
      <!--城市-->
      <div class="">{{info.province + '-' + info.city}}</div>
    </div>
    <!--统计-->
    <ul class="main-link">
      <router-link tag="li" to="/myfollow">
        <div class="num">{{info.favoriteCount}}</div>
        <div class="title">收藏</div>
      </router-link>
      <router-link tag="li" to="/myfriends/1">
        <div class="num">{{info.followersCount}}</div>
        <div class="title">关注</div>
      </router-link>
      <router-link tag="li" to="/myfriends/0">
        <div class="num">{{info.fansCount}}</div>
        <div class="title">粉丝</div>
      </router-link>
    </ul>
    <!--其他导航-->
    <div class="link-list">
      <!--<router-link to="" class="item">
        <i class="tit-icon iconfont icon-biaoqing-weixiao"></i>
        <div class="content">
          <div>我的动弹</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>-->
      <router-link to="/mymessage" class="item">
        <i class="tit-icon iconfont icon-xiaoxi1"></i>
        <div class="content">
          <div>我的消息</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="/myinfo" class="item">
        <i class="tit-icon iconfont icon-ziliao"></i>
        <div class="content">
          <div>我的资料</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link :to="'/userBlog/' + info.uid" class="item">
        <i class="tit-icon iconfont icon-wenzhang"></i>
        <div class="content">
          <div>我的博客</div>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-wenda"></i>
        <div class="content">
          <del>我的问答</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-huodong"></i>
        <div class="content">
          <del>我的活动</del>
          <i class="iconfont icon-more"></i>
        </div>
      </router-link>
      <router-link to="" class="item">
        <i class="tit-icon iconfont icon-tuandui"></i>
        <div class="content">
          <del>我的团队</del>
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
    name: 'Admin',
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
