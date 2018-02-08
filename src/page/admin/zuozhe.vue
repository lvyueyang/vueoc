<template>
  <main class="admin-home-view">
    <header-nav>关于作者</header-nav>
    <div style="padding: 10px;font-size: 15px;line-height: 1.8;">
      作者姓名：吕岳阳（阿炸克斯）<br>
      等级：前端高级菜鸟一名（屌丝程序猿） <br>
      爱好：撸代码 <br>
      个人博客：<a target="_blank" href="http://www.cnblogs.com/lvyueyang/">前端阳</a><br>
      个人 QQ：<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=975794403&site=qq&menu=yes">975794403</a>
      <h4 style="margin-bottom: 0;">项目介绍：</h4>
      <div>
        本项目是使用Vue开发，仿照并使用了开源中国的<a href="https://www.oschina.net/openapi">openapi</a>开发；
        工作比较忙，业余时间开发，因此不知道开发了多久。
        因为这个api限制，使用前必须登陆，进入时请先登陆，可以使用自己的开源中国账号，也可以直接使用我的登陆查看；
        （不要乱评论。。。会封号的）
      </div>



    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  export default {
    name: 'GuanYuZuoZhe',
    data() {
      return {

      }
    },
    components: {
      headerNav
    },
    computed: {

    },
    mounted() {
      this.$store.commit('footerhide');
    },
    methods: {

    }
  }
</script>
<style>

</style>
