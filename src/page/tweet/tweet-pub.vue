<!--动弹详情-->
<template>
  <main class="tweet-pub">
    <header-nav class="text-center"
                @submit="submit"
                :type="'pubtweet'">弹一弹</header-nav>
    <div class="textarea-wrapper"
         ref="textareaWrapper"
         :class="{'placeholder': content.length == 0}"
         contenteditable="true"
         @input="content = $event.target.innerHTML"
         :value="content"></div>
    <div class="tweet-imgs">
      <img :src="img" alt="">
    </div>
    <!--操作栏目-->
    <ul class="tweet-operate-wrapper">
      <!--<li><i class="iconfont icon-tupian"></i><input ref="imgFile" @change="imgfile" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"></li>-->
      <li><i class="iconfont icon-icon_aiye"></i></li>
      <li><i class="iconfont icon-jinghaosvg"></i></li>
      <!--<li><i class="iconfont icon-biaoqing-weixiao"></i></li>-->
    </ul>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import imgBase64 from '../../common/js/imgCompressBase64'
  import api from '../../common/js/api/api'
  import $ from 'jquery'
  export default {
    name: 'NewsDetail',
    data() {
      return {
        content:'',
        img:''
      }
    },
    components: {
      headerNav
    },
    mounted() {
      this.$store.commit('footerhide');
      this.info = this.$store.state.tweet.info;
    },
    methods: {
      imgfile(){
        let files = this.$refs.imgFile.files[0];
        new imgBase64({
          file: files,
          compressSize: 400,
          success: base64 =>{
            this.img = base64;
            this.$refs.textareaWrapper.innerHTML += `<img src="${base64}" alt="">`;
          }
        });
      },
      //图片上传待开发
      submit(){
        const token = localStorage.getItem('access_token');;
        this.$http.post(api.tweet.pub, {
          'msg': this.content,
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
