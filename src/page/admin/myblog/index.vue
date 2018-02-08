<template>
  <main class="home-main-view user-blog">
    <header-nav>用户博客列表</header-nav>
    <scroll-loading @loadingBottom="nextPage"
                    @slideUpdate="updateList"
                    :loading="blog.loading"
                    :loadingnone="blog.loadingnone">
      <div class="list" ref="list">
        <ul class="list-content article-list" ref="listContent">
          <li v-for="(v,index) in blog.list" :key="v.id">
            <router-link :to="'/blogDetail/' + v.id">
              <div class="title">
                <span class="tag" v-show="iftody(v.pubDate)">今</span>
                <span class="tag yuan" v-show="v.type == 1">原</span>
                <span class="tag jian" v-show="v.type == 4">转</span>
                {{v.title}}</div>
              <div class="atricle-info">
                <span class="user">@{{v.author}} {{v.pubDate | format}}</span>
                <span class="user"><i class="iconfont icon-xiaoxi2"></i> {{v.commentCount}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </scroll-loading>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import api from '../../../common/js/api/api'
  import scrollLoading from '../../../components/scroll/scroll-loading.vue'

  export default {
    name: 'UserBlog',
    data() {
      return {
        type:3,
        id:'1419042',
        blog:{
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
      this.id = this.$route.params.id;
      this.$store.commit('footerhide');
      this.getlist();
    },
    methods: {
      iftody: (val) => {
        //判断是否为今日发布
        let time = val.split(' ')[0].split('-');
        let date = new Date();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (time[0] != years) {
          return false;
        } else if (time[1] != month) {
          return false;
        } else if (time[2] != day) {
          return false
        } else {
          return true;
        }
      },
      getlist(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.blog.user,{
          'access_token':token,
          'authoruid':this.id,
          'page':this.blog.page,
          'pageSize':this.blog.pageSize
        }).then(res =>{
          if(res.data.status){
            if(res.data.status.code == '-1'){
              this.$popMsg.show('获取失败！');
            }
          }
          console.log(res.data)
          let list = res.data.projectlist;
          //没有评论内容
          if(!list){
            this.blog.loadingnone = true;
            this.blog.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.blog.loadingnone = true;
          }
          for(let i in list){
            this.blog.list.push(list[i])
          }
          //加载完成
          this.blog.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.blog.loadingnone){
          return;
        }
        this.blog.loading = true;
        this.blog.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.blog.loading = true;
        this.blog.loadingnone = false;
        this.blog.page = 1;
        this.blog.list = [];
        this.getlist();
      },
      //筛选分类
      filter(index){
        this.tab.active = this.tab.list[index].name;
        this.type  = this.tab.list[index].id;
        this.blog.list = [];
        this.blog.page = 1;
        this.getlist();
      },
      //判断是跳转还是弹出iframe
      links(index){
        let id = this.blog.list[index].objid;
        let type = this.blog.list[index].type;
        let url = this.blog.list[index].url;
        console.log(id);
        if(type === 3){
          this.$router.push('/blogDetail/' + id);
        }
        if(type === 4){
          this.$router.push('/newsdetail/' + id);
        }
        if(type === 1){
          let id = this.blog.list[index].url.split('www.oschina.net/p/')[1]
          this.$router.push('/projectDetail/' + id);
        }
        if(type === 2){
          this.$router.push('/postDetail/' + id);
        }
      }
    }
  }
</script>
<style>

</style>
