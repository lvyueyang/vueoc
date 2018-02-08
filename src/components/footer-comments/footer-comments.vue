<template>
  <div class="footer-comments">
    <div class="content">
      <!--输入框-->
      <div class="input-wrapper"
           @click="inpclick">
        <i class="iconfont icon-pinglun"></i>
        <input type="text" placeholder="发布评论" :readonly="readonly">
      </div>
      <!--收藏-->
      <button class="button-operate"
              @click="follow"
              v-if="isfollow"><i class="iconfont icon-shoucang-tianchong"></i></button>
      <button class="button-operate"
              @click="follow"
              v-else><i class="iconfont icon-shoucang"></i></button>
      <!--分享-->
      <button class="button-operate"
              @click="share"><i class="iconfont icon-fenxiang"></i></button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'footer-comments',
    props:{
      //默认无法输入
      readonly:{
        type:Boolean,
        default:true
      },
      //收藏状态
      isfollow:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {

      }
    },
    methods:{
      //输入框点击事件
      inpclick(){
        this.$emit('inpclick');
      },
      //收藏事件
      follow(){
        this.$emit('follow');
      },
      //分享事件
      share(){
        this.$emit('share');
      }
    }
  }
</script>
<style lang="scss">

</style>
