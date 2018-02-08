<!--动弹详情-->
<template>
  <main class="article">
    <header-nav>动弹详情</header-nav>
    <!--详情-->
    <article class="tweet-detail">
      <div class="user-info">
        <img :src="info.portrait" alt="">
        <div class="name">{{info.author}}</div>
      </div>
      <div class="content" v-html="info.body"></div>
      <div class="time">{{info.pubDate}}</div>
    </article>
    <div class="tweet-hr-title">评论(78)</div>
    <!--评论列表-->
    <div class="comments-list">
      <div class="list" ref="list">
        <div class="text-center">
          <br>
          评论接口获取失败
        </div>
        <ul>
          <li v-for="(v,index) in commentsList.info" :key="v.id">
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
    </div>
    <!--评论模态框-->
    <comments-modal v-model="comments.value"
                    v-show="comments.show"
                    @close="comments.show = false"
                    @submit="submitComments"
                    :error="comments.error"
                    :checked.sync="comments.checked"></comments-modal>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import footerComments from '../../components/footer-comments/footer-comments.vue'
  import commentsModal from '../../components/comments-modal/index.vue'
  import api from '../../common/js/api/api'
  import commentsList from '../comments/comment-list.vue'
  import scrollLoading from '../../components/scroll/scroll-loading.vue'

  export default {
    name: 'NewsDetail',
    data() {
      return {
        info: {},
        commentsList: {
          page: 1,
          pageSize: 10,
          loading: true,
          loadingnone: false,
          info: []
        },
        comments: {
          show: false,
          value: '',
          checked: '',
          error: ''
        }
      }
    },
    components: {
      headerNav,
      footerComments,
      commentsModal,
      scrollLoading
    },
    mounted() {
      this.$store.commit('footerhide');
      this.info = this.$store.state.tweet.info;
      this.getCommentsList();
    },
    methods: {
      //获取文章详情
      getArticleInfo() {
        let token = localStorage.getItem('access_token');;
        let id = this.$route.params.id;
        this.$http.post(api.tweet.detail, {
          'id': id,
          'access_token': token
        }).then(res => {
          console.log(res);
          this.info = res.data
        })
      },
      //发布评论
      submitComments() {
        const token = localStorage.getItem('access_token');;
        const id = this.info.id;
        const content = this.comments.value;

        this.$http.post(api.comments.blog.pub, {
          'blog': id,
          'content': content,
          'access_token': token
        }).then(res => {
          if (res.data.error == 200) {
            this.comments.value = '';
            this.comments.show = false;
            this.$popMsg.show('发表评论成功！');
          } else {
            console.log(res.data);
            this.comments.error = res.data.error_description;
          }
        });
      },
      //获取评论列表
      getCommentsList() {
        let id = this.$route.params.id;
        let token = localStorage.getItem('access_token');;
        this.$http.post(api.comments.news.list, {
          'id': id,
          'catalog': 3,
          'access_token': token,
          'page': this.commentsList.page,
          'pageSize': this.commentsList.pageSize
        }).then(res => {
          let list = res.data.commentList;
          console.log(res.data)
          //没有评论内容
          if (!list) {
            this.commentsList.loadingnone = true;
            this.commentsList.loading = false;
            return
          }
          //判断接下来是否还有内容
          if (list.length < 10) {
            this.commentsList.loadingnone = true;
          }
          for (let i in list) {
            this.commentsList.info.push(list[i])
          }
          //加载完成
          this.commentsList.loading = false;
        });
      },
      //滚动加载
      nextPage() {
        if (this.commentsList.loadingnone) {
          return;
        }
        this.commentsList.loading = true;
        this.commentsList.page += 1;
        this.getCommentsList();
      },
      //下拉刷新
      updateList() {
        this.commentsList.loading = true;
        this.commentsList.loadingnone = false;
        this.commentsList.page = 1;
        this.commentsList.info = [];
        this.getCommentsList();
      }
    }
  }

</script>
<style lang="scss">

</style>
