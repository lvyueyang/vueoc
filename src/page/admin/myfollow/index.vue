<template>
  <main class="admin-my-message">
    <header-nav>我的收藏</header-nav>
    <!--tab-->
    <ul class="tab-title">
      <li :class="{'active' : tab.active === v.name}"
          v-for="(v,index) in tab.list"
          @click="filter(index)"
          :key="v.id">{{v.name}}</li>
    </ul>
    <div class="tab-content-wrapper">
      <scroll-loading @loadingBottom="nextPage"
                      @slideUpdate="updateList"
                      :loading="follow.loading"
                      :loadingnone="follow.loadingnone">
        <ul class="article-list">
          <li v-for="(v,index) in follow.list"
              :key="v.objid"
              @click="links(index)">
              <div class="title">{{v.title}}</div>
          </li>
        </ul>
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
        type:3,
        tab:{
         active:'全部',
         list:[
           {name:'全部',id:0},
           {name:'软件',id:1},
           {name:'话题',id:2},
           {name:'博客',id:3},
           {name:'新闻',id:4},
           {name:'代码',id:5},
           {name:'翻译',id:7}
         ]
        },
        follow:{
          page:1,
          pageSize:20,
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
      this.$store.commit('footerhide');
      this.getlist();
    },
    methods: {
      getlist(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.follow.list,{
          'access_token':token,
          'type':this.type,
          'page':this.follow.page,
          'pageSize':this.follow.pageSize
        }).then(res =>{
          if(res.data.status){
            if(res.data.status.code == '-1'){
              this.$popMsg.show('获取失败！');
            }
          }
          let list = res.data.favoriteList;
          //没有评论内容
          if(!list){
            this.follow.loadingnone = true;
            this.follow.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.follow.loadingnone = true;
          }
          for(let i in list){
            this.follow.list.push(list[i])
          }
          //加载完成
          this.follow.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.follow.loadingnone){
          return;
        }
        this.follow.loading = true;
        this.follow.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.follow.loading = true;
        this.follow.loadingnone = false;
        this.follow.page = 1;
        this.follow.list = [];
        this.getlist();
      },
      //筛选分类
      filter(index){
        this.tab.active = this.tab.list[index].name;
        this.type  = this.tab.list[index].id;
        this.follow.list = [];
        this.follow.page = 1;
        this.getlist();
      },
      //判断是跳转还是弹出iframe
      links(index){
        let id = this.follow.list[index].objid;
        let type = this.follow.list[index].type;
        let url = this.follow.list[index].url;
        console.log(id);
        if(type === 3){
          this.$router.push('/blogDetail/' + id);
        }else if(type === 4){
          this.$router.push('/newsdetail/' + id);
        }else if(type === 1){
          let id = this.follow.list[index].url.split('www.oschina.net/p/')[1]
          this.$router.push('/projectDetail/' + id);
        }else if(type === 2){
          this.$router.push('/postDetail/' + id);
        }else{

        }
      }
    }
  }
</script>
<style>

</style>
