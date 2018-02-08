<template>
  <main class="admin-home-view">
    <header-nav></header-nav>
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

    </div>
    <!--其他导航-->
    <div class="users-wrapper-tab">
      <div class="link-list myinfo">
        <router-link to="" class="item">
          <div class="content">
            <div>加入时间</div>
            <div style="color: #999;">{{info.joinTime}}</div>
          </div>
        </router-link>
        <router-link to="" class="item">
          <div class="content">
            <div>所在地区</div>
            <div style="color: #999;">{{info.city}}</div>
          </div>
        </router-link>
        <router-link to="" class="item">
          <div class="content">
            <div>开发平台</div>
            <div style="color: #999;">{{info.platforms.join(',')}}</div>
          </div>
        </router-link>
        <router-link to="" class="item">
          <div class="content">
            <div>专长领域</div>
            <div style="color: #999;">{{info.expertise.join(',')}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import api from '../../common/js/api/api'

  export default {
    name: 'User',
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
      this.followUser();
    },
    methods: {
      getMYinfo(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.user.myindex, {
          'access_token': token
        }).then(res => {
          let qid = this.$route.params.id;
          this.getUserInfo(res.data.id, qid)
        })
      },
      //获取用户信息
      getUserInfo(id, qid) {
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.user.userinfo, {
          'user': id,
          'friend': qid,
          'access_token': token
        }).then(res => {
          this.info = res.data;
          console.log(this.info)
        })
      },
      //动态列表
      followUser() {
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.user.dongtailist, {
          'pageSize': 10,
          'page': 1,
          'catalog': 1,
          'access_token': token
        }).then(res => {
          console.log(res.data)
        }).catch(err =>{
          console.log(err)
        })
      },
    }
  }
</script>
<style>

</style>
