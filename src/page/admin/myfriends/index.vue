<template>
  <main class="admin-my-message">
    <header-nav>{{title}}</header-nav>
    <div class="tab-content-wrapper">
      <scroll-loading @loadingBottom="nextPage"
                      @slideUpdate="updateList"
                      :loading="friends.loading"
                      :loadingnone="friends.loadingnone">
        <div class="list" ref="list">
          <ul>
            <li v-for="(v,index) in friends.list" :key="v.id">
              <div class="face-img"><img :src="v.portrait" alt=""></div>
              <div>
                <div class="name green">
                  {{v.name}}
                  <i class="iconfont icon-nan" v-if="v.gender === 1"></i>
                  <i class="iconfont icon-nv" v-else></i>
                </div>
                <div class="expertise">{{v.expertise}}</div>
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
        title:'关注列表',
        tab:{
         active:'私信',
         list:[
           {name:'私信',id:0},
           {name:'通知',id:1}
         ]
        },
        friends:{
          page:1,
          pageSize:10,
          loading:true,
          loadingnone:false,
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
      this.$route.params.type == 0 ? this.title = '粉丝列表' : '关注列表';
      console.log(this.$route.params.type)
      this.$store.commit('footerhide');
      this.getlist();

    },
    methods: {
      getlist(){
        let type = this.$route.params.type;
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.friends.list,{
          'access_token':token,
          'relation':type,
          'page':this.friends.page,
          'pageSize':this.friends.pageSize
        }).then(res =>{
          let list = res.data.userList;
          //没有评论内容
          if(!list){
            this.friends.loadingnone = true;
            this.friends.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.friends.loadingnone = true;
          }
          for(let i in list){
            this.friends.list.push(list[i])
          }
          //加载完成
          this.friends.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.friends.loadingnone){
          return;
        }
        this.friends.loading = true;
        this.friends.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.friends.loading = true;
        this.friends.loadingnone = false;
        this.friends.page = 1;
        this.friends.list = [];
        this.getlist();
      },
    }
  }
</script>
<style>

</style>
