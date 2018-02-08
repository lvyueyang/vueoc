<template>
  <div>
    <div class="comments-list mt">
      <header-nav class="text-center"><div style="padding-right: 1rem;">评论内容</div></header-nav>
      <scroll-loading @loadingBottom="nextPage"
                      @slideUpdate="updateList"
                      :loading="list.loading"
                      :loadingnone="list.loadingnone">
        <div class="list" ref="list">
          <ul>
            <li v-for="(v,index) in list.info" :key="v.id">
              <div class="user-wrapper">
                <div class="users">
                  <div class="face-img"><img :src="v.commentPortrait" alt=""></div>
                  <div>
                    <div class="name">{{v.commentAuthor}}</div>
                    <div class="time">{{v.pubDate}}</div>
                  </div>
                </div>
                <div class="operate">
                  <button>
                    <!--<i class="iconfont icon-zan"></i>-->
                  </button>
                </div>
              </div>
              <div class="comments-content-sub">
                <div class="item" v-for="(m,index) in v.refers">
                  <div class="name-sub">{{m.refertitle}}：</div>
                  <div class="content-sub">{{m.referbody}}</div>
                </div>
              </div>
              <div class="comments-content" v-html="v.content"></div>
            </li>
          </ul>
        </div>
      </scroll-loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'
  import api from '../../common/js/api/api'

  export default {
    name: 'commentList',
    data() {
      return {
        list: {
          page:1,
          pageSize:10,
          loading:true,
          loadingnone:false,
          info:[]
        },
        id:'',
        type:''
      }
    },
    components: {
      headerNav,
      scrollLoading
    },
    mounted() {
      this.$store.commit('footerhide');
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
      this.getlist();
    },
    methods: {
      getlist(){
        let url;
        let catalog;
        let id = this.id;
        let token = localStorage.getItem('access_token');;
//        if(this.type === 'blog'){
//          url = api.comments.blog.list;
//        }
        if(this.type === 'news'){
          url = api.comments.news.list;
          catalog = 1;
        }else if(this.type === 'tiezi'){
          url = api.comments.news.list;
          catalog = 2;
        }else if(this.type === 'dongtan'){
          url = api.comments.news.list;
          catalog = 3;
        }else if(this.type === 'msg'){
          url = api.comments.news.list;
          catalog = 4;
        }else if(this.type === 'blog'){
          url = api.comments.news.list;
          catalog = 5;
        }

        if(this.list.loadingnone){
          this.list.loading = false;
          return false;
        }

        this.$http.post(url,{
          'id':id,
          'catalog':catalog,
          'access_token':token,
          'page':this.list.page,
          'pageSize':this.list.pageSize
        }).then(res =>{
          let list = res.data.commentList;

          //没有评论内容
          if(!list){
            this.list.loadingnone = true;
            this.list.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.list.loadingnone = true;
          }
          for(let i in list){
            this.list.info.push(list[i])
          }
          //加载完成
          this.list.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.list.loadingnone){
          return;
        }
        this.list.loading = true;
        this.list.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.list.loading = true;
        this.list.loadingnone = false;
        this.list.page = 1;
        this.list.info = [];
        this.getlist();
      },
    }
  }
</script>
<style lang="scss">

</style>
