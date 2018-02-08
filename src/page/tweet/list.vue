<template>
  <main class="home-main-view">
    <header-nav :type="'search'">动弹</header-nav>
    <!--筛选-->
    <div class="home-filter">
      <div class="box" style="padding-right: 0;">
        <ul>
          <li v-tab
              @click="newsFilter(0)"
              class="active"><span>最新动弹</span></li>
          <li v-tab @click="newsFilter('-1')"><span>热门动弹</span></li>
          <!--<li v-tab @click="newsFilter('no')" ><span>每日乱弹</span></li>-->
          <li v-tab @click="newsFilter(myid)" ><span>我的动弹</span></li>
        </ul>
      </div>
      <!--<button class="more"><i class="iconfont icon-add"></i></button>-->
    </div>
    <!--动弹列表-->
    <scroll-loading @loadingBottom="nextPage"
                    @slideUpdate="updateList"
                    :loading="loading"
                    :rotate="resRotate"
                    :loadingnone="loadingnone">
      <div class="list" ref="list">
        <div class="list-content text-center" v-if="type == 'no'" style="padding-top: 30px;">
          暂无此接口
        </div>
        <ul class="list-content tweet-list" v-else ref="listContent">
          <li v-for="(v,index) in list" :key="v.authorid">
            <div>
              <img class="userimg" :src="v.portrait" alt="">
              <div class="content">
                <div class="username" @click.self="nextDetail(index)" >{{v.author}}</div>
                <div class="user-content" @click.self="nextDetail(index)" v-html="v.body"></div>
                <div class="operate-bottom" @click.self="nextDetail(index)" >
                  <div class="time">{{v.pubDate | format}}</div>
                  <div class="operate">
                    <i class="iconfont icon-xiaoxi2"></i> {{v.commentCount}}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </scroll-loading>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import Api from '../../common/js/api/api'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'
  import $ from 'jquery'

  export default {
    name: 'mainIndex',
    data() {
      return {
        notNextTick: true,
        resRotate:true,
        loading:false,
        loadingnone:false,
        page:1,
        type:'0',
        list:[],
        myid:''
      }
    },
    directives:{
      tab:{
        //选中样式
        inserted(el){
          el.onclick = ()=>{
            $(el).addClass('active').siblings().removeClass('active');
          }
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
      let token = localStorage.getItem('access_token');;
      this.$http.post(Api.user.myuserinfo, {
        'access_token': token
      }).then(res => {
        this.myid = res.data.id;
      });
      //获取列表
      this.getList();
    },
    methods: {
      //获取列表
      getList(){
        this.loading = true;
        this.loadingnone = false;
        this.resRotate = true;
        let token = localStorage.getItem('access_token');;
        let page = this.page;
        let type = this.type;
        this.$http.post(Api.tweet.list, {
            'user': type,
            'page': page,
            'pageSize': 10,
            'access_token': token
        }).then(res => {
          let lists = res.data.tweetlist;
          for(let i of lists){
            this.list.push(i);
          }
          //加载条隐藏
          this.loading = false;
          this.resRotate = false;
          let len =  lists.length;
          //判断下一页是否为空
          if(len < 10){
            this.loadingnone = true;
          }
        }).catch(err =>{
          this.loading = false;
          this.resRotate = false;
          this.loadingnone = true;
        });
      },
      //滚动加载
      nextPage(){
          this.page = this.page + 1;
          this.getList();
      },
      //筛选
      newsFilter(type = 1){
        if(type === 'no'){

        }
        this.loadingnone = false;
        this.type = type;
        this.page = 1;
        this.list = [];
        this.getList();
      },
      //下拉刷新
      updateList(type = 0){
        this.loadingnone = false;
        this.page = 1;
        this.list = [];
        this.getList();
      },
      //详情
      nextDetail(index){
        console.log(this.list[index]);
        this.$store.commit('addTweet',this.list[index]);
        this.$router.push('/tweetDetail/' + this.list[index].authorid);
      }
    }
  }
</script>
<style>

</style>
