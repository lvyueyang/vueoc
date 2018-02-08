<template>
  <main class="admin-my-message">
    <header-nav>帖子列表</header-nav>
    <!--tab-->
   <!-- <ul class="tab-title">
      <li :class="{'active' : tab.active === v.name}"
          v-for="(v,index) in tab.list"
          @click="filter(index)"
          :key="v.id">{{v.name}}</li>
    </ul>-->
    <div class="tab-content-wrapper">
      <scroll-loading @loadingBottom="nextPage"
                      @slideUpdate="updateList"
                      :loading="post.loading"
                      :loadingnone="post.loadingnone">
        <ul class="post-list" style="overflow-x: hidden;">
          <li v-for="(v,index) in post.list"
              :key="v.objid"
              @click="links(index)">
            <div class="face-img"><img :src="v.portrait" alt=""></div>
            <div>
              <div class="name">{{v.author}}</div>
              <div class="expertise">{{v.title}}</div>
            </div>
          </li>
        </ul>
      </scroll-loading>
    </div>

  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import api from '../../common/js/api/api'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'

  export default {
    name: 'Post',
    data() {
      return {
        type:0,
        tab:{
          active:'全部',
          list:[
            {name:'全部',id:0},
            {name:'问答 ',id:1},
            {name:'分享 ',id:2},
            {name:'IT杂烩',id:3},
            {name:'站务',id:4},
            {name:'职业生涯',id:100}
          ]
        },
        post:{
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
      this.$store.commit('footerhide');
      this.getlist();
    },
    methods: {
      getlist(){
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.post.list,{
          'access_token':token,
          'type':this.type,
          'page':this.post.page,
          'pageSize':this.post.pageSize
        }).then(res =>{
          console.log(res.data)
          let list = res.data.post_list;
          //没有评论内容
          if(!list){
            this.post.loadingnone = true;
            this.post.loading = false;
            return
          }
          //判断接下来是否还有内容
          if(list.length < 10){
            this.post.loadingnone = true;
          }
          for(let i in list){
            this.post.list.push(list[i])
          }
          //加载完成
          this.post.loading = false;
        });
      },
      //滚动加载
      nextPage(){
        if(this.post.loadingnone){
          return;
        }
        this.post.loading = true;
        this.post.page += 1;
        this.getlist();
      },
      //下拉刷新
      updateList(){
        this.post.loading = true;
        this.post.loadingnone = false;
        this.post.page = 1;
        this.post.list = [];
        this.getlist();
      },
      //筛选分类
      filter(index){
        this.tab.active = this.tab.list[index].name;
        this.type  = this.tab.list[index].id;
        this.post.list = [];
        this.post.page = 1;
        this.getlist();
      },
      //判断是跳转还是弹出iframe
      links(index){
        let id = this.post.list[index].id;
        this.$router.push('/postDetail/' + id);
      }
    }
  }
</script>
<style>

</style>
