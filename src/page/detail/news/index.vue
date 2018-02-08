<!--新闻详情-->
<template>
  <main class="article">
    <header-nav
      :type="'comments'"
      :commentnum="info.commentCount"
      :commentstype="'news'"
      :id="info.id">资讯详情</header-nav>
    <!--文章详情-->
    <article class="article-detail">
      <h1 class="article-title">{{info.title}}</h1>
      <div class="article-info">@{{info.author}}&emsp;&emsp;发布于{{info.pubDate}}</div>
      <div class="article-content" v-html="info.body"></div>
    </article>
    <!--相关推荐-->
    <div class="recommendation">
      <div class="hr-title">相关推荐</div>
      <ul class="recommendation-list">
        <li v-for="(v,index) in info.relativies"
            :key="index"
            @click="$iframeModal.show(v.url)">
          <a href="javascript:;">
            <div>{{v.title}}</div><i class="iconfont icon-more"></i>
          </a>
        </li>
      </ul>
    </div>
    <!--底部-->
    <footer-comments :isfollow="info.favorite == 1"
                     @follow="follow(info.id,4)"
                     @share=""
                     @inpclick="comments.show = true"></footer-comments>
    <comments-modal v-model="comments.value"
                    v-show="comments.show"
                    @close="comments.show = false"
                    @submit="submitComments"
                    :error="comments.error"
                    :checked.sync="comments.checked"></comments-modal>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import footerComments from '../../../components/footer-comments/footer-comments.vue'
  import commentsModal from '../../../components/comments-modal/index.vue'
  import api from  '../../../common/js/api/api'
  import commentsList from '../../comments/comment-list.vue'

  export default {
    name: 'NewsDetail',
    data() {
      return {
        info:{},
        comments:{
          show:false,
          value:'',
          checked:'',
          error:''
        }
      }
    },
    components:{
      headerNav,
      footerComments,
      commentsModal
    },
    mounted(){
      this.getArticleInfo();
      this.$store.commit('footerhide');
    },
    methods:{
      //获取文章详情
      getArticleInfo(){
        let token = localStorage.getItem('access_token');;
        let id = this.$route.params.id;
        this.$http.post(api.news.detail,{
          'id':id,
          'access_token':token
        }).then(res =>{
          this.info = res.data
        })
      },
      //添加，取消收藏
      follow(id, type) {
        let token = localStorage.getItem('access_token');;
        if (this.info.favorite == 0) {
          //未收藏
          this.$http.post(api.follow.add, {
            'id': id,
            'type': type,
            'access_token': token
          }).then(res => {
            if (res.data.error == 200) {
              this.getArticleInfo();
              this.$popMsg.show('收藏成功！');
            }
          })
        } else {
          //已收藏
          this.$http.post(api.follow.remove, {
            'id': id,
            'type': type,
            'access_token': token
          }).then(res => {
            if (res.data.error == 200) {
              this.getArticleInfo();
              this.$popMsg.show('取消收藏成功！');
            }
          })
        }
      },
      //发布评论
      submitComments(){
        const token = localStorage.getItem('access_token');;
        const id = this.info.id;
        const content = this.comments.value;

        this.$http.post(api.comments.blog.pub, {
          'blog': id,
          'content': content,
          'access_token': token
        }).then(res => {
          if (res.data.error == 200) {
            this.submitTweet(content);
            this.comments.value = '';
            this.comments.show = false;
            this.$popMsg.show('发表评论成功！');
          }else{
            console.log(res.data);
            this.comments.error = res.data.error_description;
          }
        });
      },
      //发布动弹
      submitTweet(msg){
        const token = localStorage.getItem('access_token');;
        this.$http.post(api.tweet.pub, {
          'msg': msg,
          'img': '',
          'access_token': token
        }).then(res => {
          if (res.data.error == 200) {
            this.$popMsg.show('发表动弹成功！');
          }else{
            this.$popMsg.show(res.data.error_description);
          }
        });
      }
    }
  }

</script>
<style lang="scss">

</style>
