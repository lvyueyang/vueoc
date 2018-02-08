<template>
  <header class="header-nav" :class="type">
    <nav>
      <!--返回-->
      <span @click="$router.go(-1)" v-if="backShow"><i class="iconfont icon-back"></i></span>
      <!--个人中心-设置 admin-->
      <router-link v-if="type === 'admin'" to="/set"><i class="iconfont icon-set"></i></router-link>
      <!--标题-->
      <div class="title" :class="{'text-center':type === 'search'}"><slot></slot></div>
      <!--搜索类 search-->
      <router-link v-if="type === 'search'" to="/search"><i class="iconfont icon-sousuo"></i></router-link>
      <!--分享类 share-->
      <span v-if="type === 'share'"><i class="iconfont icon-fenxiang"></i></span>
      <!--发送动弹 pubtweet-->
      <span v-if="type === 'pubtweet'" class="submit" @click="submit">发送</span>
      <!--评论类 comment-->
      <router-link v-if="type === 'comments'" :to="'/commentsList/' + commentstype + '/' + id" class="header-icon-comments"><span>{{num}}</span></router-link>
      <!--个人中心-设置 admin-->
      <router-link v-if="type === 'admin'" to=""><i class="iconfont icon-erweima"></i></router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header-nav',
  props:['type','commentnum','id','commentstype'],
  data () {
    return {
      backShow:true
    }
  },
  computed:{
    num(){
      let val = parseFloat(this.commentnum)
      if(val > 99){
        return '99+'
      }else{
        return val
      }
    }
  },
  mounted(){
    if(this.type == 'search' || this.type == 'admin'){
      this.backShow = false;
    }else{
      this.backShow = true;
    }
  },
  methods:{
    submit(){
      this.$emit('submit');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
