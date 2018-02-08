<template>
  <main class="admin-my-info">
    <header-nav>我的资料</header-nav>
    <!--资料列表-->
    <div class="link-list myinfo" v-if="info.portrait">
      <router-link to="" class="item">
        <div class="content">
          <div>头像</div>
          <img :src="info.portrait" class="my-headimg" alt="">
        </div>
      </router-link>
      <router-link to="" class="item">
        <div class="content">
          <div>昵称</div>
          <div style="color: #999;">{{info.name}}</div>
        </div>
      </router-link>
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
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import api from '../../../common/js/api/api'

  export default {
    name: 'MyInfo',
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
      this.$store.commit('footerhide');
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
