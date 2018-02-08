<template>
  <main class="admin-my-message">
    <header-nav>消息中心</header-nav>
    <!--tab-->
    <!--<ul class="tab-title">
      <li :class="{'active' : tab.active === v.name}" v-for="(v,index) in tab.list" :key="v.id">{{v.name}}</li>
    </ul>-->
    <div class="tab-content-wrapper">
      <scroll-loading @loadingBottom="nextPage"
                      @slideUpdate="updateList"
                      :loading="msg.loading"
                      :loadingnone="msg.loadingnone">
        <div class="list" ref="list">
          <ul>
            <li v-for="(v,index) in msg.list" :key="v.id">
              <div class="face-img"><img :src="v.portrait" alt=""></div>
              <div>
                <div class="name">{{v.friendname}}</div>
                <div class="cont" v-html="v.content"></div>
              </div>
            </li>
          </ul>
        </div>
      </scroll-loading>
    </div>

  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import api from '../../../common/js/api/api'
  import scrollLoading from '../../../components/scroll/scroll-loading.vue'

  export default {
    name: 'MyInfo',
    data() {
      return {
        tab:{
         active:'私信',
         list:[
           {name:'私信',id:0},
           {name:'通知',id:1}
         ]
        },
        msg:{
          page:1,
          pageSize:10,
          loading:true,
          loadingnone:false,
          list:[]
        },
        tz:{
          list:[]
        }
      }
    },
    components: {
      headerNav,
      scrollLoading
    },
    computed: {

    },
    mounted() {
      this.$store.commit('footerhide');
      this.getlist();
    },
    methods: {
      getlist(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.message.list,{
          'access_token':token,
          'page':this.msg.page,
          'pageSize':this.msg.pageSize
        }).then(res =>{
          let list = res.data.messageList;
          //没有评论内容
          if(!list){
            this.msg.loadingnone = true;
            this.msg.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.msg.loadingnone = true;
          }
          for(let i in list){
            this.msg.list.push(list[i])
          }
          //加载完成
          this.msg.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.msg.loadingnone){
          return;
        }
        this.msg.loading = true;
        this.msg.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.msg.loading = true;
        this.msg.loadingnone = false;
        this.msg.page = 1;
        this.msg.list = [];
        this.getlist();
      },
    }
  }
</script>
<style>

</style>
