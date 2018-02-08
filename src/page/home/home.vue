<template>
  <main class="home-main-view">
    <header-nav :type="'search'">综合</header-nav>
    <!--筛选-->
    <div class="home-filter">
      <div class="box" style="padding-right: 0;">
        <ul>
          <li v-tab
              class="active"
              @click="newsFilter(1)"><span>所有新闻</span></li>
          <li v-tab @click="newsFilter(2)"><span>综合新闻</span></li>
          <li v-tab @click="newsFilter(3)"><span>软件更新</span></li>
          <li v-tab @click="getRecommendList"><span>推荐博客</span></li>
          <li v-tab @click="getTodayBlogList"><span>每日一博</span></li>
        </ul>
      </div>
      <!--<button class="more"><i class="iconfont icon-add"></i></button>-->
    </div>
    <!--新闻列表-->
    <scroll-loading @loadingBottom="nextPage"
                    @slideUpdate="updateList"
                    v-show="listshow"
                    :loading="news.loading"
                    :rotate="resRotate"
                    :loadingnone="news.loadingnone">
      <div class="list" ref="list">
        <swiper v-show="news.type == 1" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" class="swiper-box">
          <swiper-slide><img src="../../common/img/dm/banner.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../../common/img/dm/banner.jpg" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <ul class="list-content article-list" ref="listContent">
          <li v-for="(v,index) in news.list" :key="v.id">
            <router-link :to="'/newsdetail/' + v.id">
              <div class="title"><span class="tag" v-show="iftody(v.pubDate)">今</span>{{v.title}}</div>
              <div class="atricle-info">
                <span class="user">@{{v.author}} {{v.pubDate | format}}</span>
                <span class="user"><i class="iconfont icon-xiaoxi2"></i> {{v.commentCount}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </scroll-loading>
    <!--博客列表-->
    <scroll-loading @loadingBottom="nextPage(1)"
                    @slideUpdate="updateList(1)"
                    v-show="!listshow"
                    :loading="blog.loading"
                    :loadingnone="blog.loadingnone">
      <div class="list" ref="list">
        <ul class="list-content article-list" ref="listContent">
          <li v-for="(v,index) in blog.list" :key="v.id">
            <router-link :to="'blogDetail/' + v.id">
              <div class="title">
                <span class="tag" v-show="iftody(v.pubDate)">今</span>
                <span class="tag yuan" v-show="v.type == 1">原</span>
                <span class="tag jian" v-show="v.type == 4">转</span>
                {{v.title}}</div>
              <!--<div class="bewrite">赶往珠海，依然秉持着“自由，开放，分享”的思想， 为大家带来精彩的主题演讲，另外还有珠海本地优秀的开源项目展示，一定不要错过哦~</div>-->
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
  import headerNav from '../../components/header-nav/header-nav.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Api from '../../common/js/api/api'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'
  import $ from 'jquery'

  export default {
    name: 'mainIndex',
    data() {
      return {
        notNextTick: true,
        resRotate:false,
        swiperOption: {
          autoplay: 3000,
          loop:true,
          pagination: '.swiper-pagination'
        },
        listshow:true,
        news: {
          list: [],
          page:1,
          type:1,
          loading:true,
          loadingnone:false,
        },
        blog: {
          blogtype:1,
          list: [],
          page:1,
          loading:true,
          loadingnone:false,
        }
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
      swiper,
      swiperSlide,
      scrollLoading
    },
    computed: {
      istime(val){
        let time = val.split(' ')[0].split('-');
        let date = new Date();
      }
    },
    mounted() {
      //获取新闻列表
      this.getList();
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
      //获取新闻列表
      getList(){
        this.news.loading = true;
        this.resRotate = true;
        let token = localStorage.getItem('access_token');;
        let page = this.news.page;
        let type = this.news.type;
        this.$http.post(Api.news.list, {
            'catalog': type,
            'page': page,
            'pageSize': 10,
            'access_token': token
        }).then((res) => {
          let list = res.data.newslist;
          for (let i in list) {
            this.news.list.push(list[i]);
          }
          //判断下一页是否为空
          if(list.length < 10){
            this.news.loadingnone = true;
          }
          //加载条隐藏
          this.news.loading = false;
          this.resRotate = false;
        });
      },
      //获取博客列表 type ：1 全部博客 2推荐博客
      getBlogList(){
        this.listshow = false;
        this.blog.loading = true;
        this.resRotate = true;
        let token = localStorage.getItem('access_token');;
        let page = this.blog.page;
        let url;
        let type = this.blog.blogtype;
        if(type === 1){
          url = Api.blog.list;
        }else{
          url = Api.blog.recommend_list;
        }

        this.$http.get(url, {
          params: {
            'page': page,
            'pageSize': 10,
            'access_token': token
          }
        }).then((res) => {
          let list = res.data.bloglist;

          for (let i in list) {
            this.blog.list.push(list[i]);
          }
          //判断下一页是否为空
          if(list.length < 10){
            this.blog.loadingnone = true;
          }
          //加载条隐藏
          this.blog.loading = false;
//          this.resRotate = false;
        });
      },
      //获取推荐博客
      getRecommendList(){
        this.blog.list = [];
        this.blog.page = 1;
        this.blog.blogtype = 2;
        this.getBlogList();
      },
      //获取推荐博客
      getTodayBlogList(){
        this.blog.list = [];
        this.blog.page = 1;
        this.blog.blogtype = 1;
        this.getBlogList();
      },
      //滚动加载
      nextPage(type = 0){
        if(type === 0){
          this.news.page = this.news.page + 1;
          this.getList();
        }else{
          this.blog.page = this.blog.page + 1;
          this.getBlogList();
        }
      },
      //新闻筛选
      newsFilter(type = 1){
        this.news.type = type;
        this.news.page = 1;
        this.news.list = [];
        this.getList();
        this.listshow = true;
      },
      //下拉刷新
      updateList(type = 0){
        if(type === 0){
          this.news.page = 1;
          this.news.list = [];
          this.getList();
        }else{
          this.blog.page = 1;
          this.blog.list = [];
          this.getBlogList();
        }

      }
    }
  }
</script>
<style>

</style>
