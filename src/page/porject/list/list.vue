<template>
  <main class="project-list">
    <scroll-loading @loadingBottom="nextPage"
                    @slideUpdate="updateList"
                    :loading="loading"
                    :rotate="resRotate"
                    :loadingnone="loadingnone">
      <!--此处传的应该是链接后的名称，不能传名字-->
    <router-link :to="'/projectDetail/' + v.url.split('www.oschina.net/p/')[1]"
                 :key="v.name"
                 class="item"
                 v-for="(v,index) in list">
      <div>
        <div class="title">{{v.name}}</div>
        <div class="contetn">{{v.description}}</div>
      </div>
    </router-link>
    </scroll-loading>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import scrollLoading from '../../../components/scroll/scroll-loading.vue'
  import api from '../../../common/js/api/api'

  export default {
    name: 'ProjectList',
    data() {
      return {
        tag:'all',
        list:[],
        type:1,
        loading:true,
        loadingnone:false,
        resRotate:false
      }
    },
    components: {
      headerNav,
      scrollLoading
    },
    watch:{
      '$route':function () {
        this.$store.commit('footerhide');
        this.type = this.$route.params.type;
        this.getList();
      }
    },
    computed: {},
    mounted() {
      this.$store.commit('footerhide');
      this.type = this.$route.params.type;
      this.getList();
    },
    methods: {
      //获取列表
      getList(){
        this.loading = true;
        this.resRotate = true;
        let token = localStorage.getItem('access_token');;
        let type = this.type;
        if(type == 'recommend' || type == 'time' || type == 'view' || type == 'cn'){
          this.$http.post(api.project.list, {
            'type': type,
            'access_token': token
          }).then((res) => {
            let list = res.data.projectlist;
            this.list = list;

            //加载条隐藏
            this.loading = false;
            this.resRotate = false;
          });
        }else{
          this.$http.post(api.project.tag_list, {
            'tag': type,
            'access_token': token
          }).then((res) => {
            let list = res.data.projectlist;
            this.list = list;

            //加载条隐藏
            this.loading = false;
            this.resRotate = false;
          });
        }

      },
      //滚动加载
      nextPage(){},
      //下拉刷新
      updateList(){
        this.list = [];
        this.getList();
      }
    }
  }
</script>
<style>

</style>
