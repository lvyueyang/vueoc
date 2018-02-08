<!--新闻详情-->
<template>
  <main class="article">
    <header-nav >软件详情</header-nav>
    <!--文章详情-->
    <article class="article-detail project-detail">
      <h1 class="article-title">
        <div class="logo"><img :src="info.logo" alt=""></div>
        <div class="name">{{info.extensionTitle}}</div>
      </h1>
      <div class="article-info">
        <a :href="info.homepage"><i class="iconfont icon-gongsiguanwang"></i>软件官网</a>
        <a :href="info.document"><i class="iconfont icon-wendang"></i>软件文档</a>
      </div>
      <div class="article-content" v-html="info.body"></div>
    </article>
    <div class="hr-title">软件属性</div>
    <div class="project-attr">
      软件类型：{{info.license}} <br>
      语言类型：{{info.languages}} <br>
      操作系统：{{info.os}} <br>
      收录日期：{{info.recordtime}}
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import api from  '../../common/js/api/api'

  export default {
    name: 'ProjectDetail',
    data() {
      return {
        info:{}
      }
    },
    components:{
      headerNav
    },
    mounted(){
      this.getArticleInfo();
      this.$store.commit('footerhide');
    },
    methods:{
      //获取详情
      getArticleInfo(){
        let token = localStorage.getItem('access_token');;
        let id = this.$route.params.id;
        this.$http.post(api.project.detail,{
          'ident':id,
          'access_token':token
        }).then(res =>{
          this.info = res.data
        })
      }
    }
  }

</script>
<style lang="scss">

</style>
