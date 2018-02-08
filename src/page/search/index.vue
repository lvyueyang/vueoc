<template>
  <main class="home-main-view">
    <div class="search-wrapper">
      <div>
        <div class="inp">
          <i class="iconfont icon-search"></i>
          <input type="search" placeholder="搜索新闻、博客、开源软件、帖子" v-model="list.content" @keyup.enter="getList">
        </div>
        <button @click="getList">搜索</button>
      </div>
    </div>
    <!--筛选-->
    <div class="home-filter search-filter">
      <div class="box" style="padding-right: 0;">
        <ul>
          <li v-for="(v,index) in tab.list"
              @click="searchFilter(index)"
              :class="{'active' : v.type === tab.active}"><span>{{v.name}}</span></li>
        </ul>
      </div>
    </div>
    <!--新闻列表-->
    <scroll-loading @loadingBottom="nextPage"
                    @slideUpdate="updateList"
                    :loading="list.loading"
                    :rotate="resRotate"
                    style="margin-top: -1rem;"
                    :loadingnone="list.loadingnone">
      <div class="list" ref="list">
        <ul class="list-content article-list" ref="listContent">
          <li v-for="(v,index) in list.list" :key="v.id">
            <!--新闻-->
            <router-link :to="'/newsdetail/' + v.id" v-if="list.type == 'news'">
              <div class="title">{{v.title}}</div>
              <div class="atricle-info">
                <span class="user">@{{v.author}} {{v.pubDate | format}}</span>
              </div>
            </router-link>
            <!--博客-->
            <router-link :to="'/blogDetail/' + v.id" v-else-if="list.type == 'blog'">
              <div class="title">{{v.title}}</div>
              <div class="atricle-info">
                <span class="user">@{{v.author}} {{v.pubDate | format}}</span>
              </div>
            </router-link>
            <!--软件-->
            <router-link :to="'/projectDetail/' + v.url.split('www.oschina.net/p/')[1]" v-else-if="list.type == 'project'">
              <div class="title">{{v.name}}</div>
              <div class="atricle-info">{{v.title}}</div>
            </router-link>
            <!--帖子-->
            <router-link :to="'/postDetail/'+ v.id" v-else>
              <div class="title">{{v.title}}</div>
              <div class="atricle-info">
                <span class="user">@{{v.author}} {{v.pubDate | format}}</span>
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
  import Api from '../../common/js/api/api'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'

  export default {
    name: 'Search',
    data() {
      return {
        notNextTick: true,
        resRotate: false,
        tab: {
          active: 'news',
          list: [
            {name: '新闻', type: 'news'},
            {name: '博客', type: 'blog'},
            {name: '开源软件', type: 'project'},
            {name: '帖子', type: 'post'}
          ]
        },
        list: {
          list: [],
          content: '',
          page: 1,
          type: 'news',
          loading: false,
          loadingnone: false,
        }
      }
    },
    components: {
      headerNav,
      scrollLoading
    },
    computed: {
      istime(val) {
        let time = val.split(' ')[0].split('-');
        let date = new Date();
      }
    },
    mounted() {
      this.$store.commit('footerhide');
    },
    methods: {
      //获取新闻列表
      getList() {
        let content = this.list.content;
        if (content.trim().length === 0) {
          return false;
        }
        this.list.loading = true;
        this.list.loadingnone = false;
        this.resRotate = true;
        let token = localStorage.getItem('access_token');;
        let page = this.list.page;
        let type = this.list.type;

        this.$http.post(Api.search.list, {
          'catalog': type,
          'q': content,
          'page': page,
          'pageSize': 20,
          'access_token': token
        }).then((res) => {
          let list = res.data.searchlist;
          console.log(res.data)
          for (let i in list) {
            this.list.list.push(list[i]);
          }
          //判断下一页是否为空
          if (list.length < 20) {
            this.list.loadingnone = true;
          }
          //加载条隐藏
          this.list.loading = false;
          this.resRotate = false;
        });
      },
      //滚动加载
      nextPage(type = 0) {
        this.list.page = this.list.page + 1;
        this.getList();
      },
      //新闻筛选
      searchFilter(index) {
        let type = this.tab.list[index].type;
        this.tab.active = type;
        this.list.type = type;
        this.list.page = 1;
        this.list.list = [];
        this.getList();
        this.listshow = true;
      },
      //下拉刷新
      updateList(type = 0) {
        this.list.page = 1;
        this.list.list = [];
        this.getList();
      }
    }
  }
</script>
<style>

</style>
