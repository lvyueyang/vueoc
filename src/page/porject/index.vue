<template>
  <main style="background-color: #f6f6f6;">
    <header-nav>开源软件</header-nav>
    <!--筛选-->
    <ul class="project-filters">
      <li :class="{'active' : tab.active == v.tag}"
          v-for="(v,index) in tab.list"
          @click="tabClick(index)"
          :key="v.tag">{{v.name}}</li>
    </ul>
    <!--子路由-->
    <div class="project-view">
      <router-view></router-view>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../components/header-nav/header-nav.vue'
  import api from '../../common/js/api/api'

  export default {
    name: 'Project',
    data() {
      return {
        tab:{
          active:'all',
          list:[
            {name:'分类',id:0,tag:'all'},
            {name:'推荐',id:1,tag:'recommend'},
            {name:'最新',id:2,tag:'time'},
            {name:'热门',id:3,tag:'view'},
            {name:'国产',id:3,tag:'cn'},
          ]
        }
      }
    },
    components: {
      headerNav
    },
    watch:{
      '$route':function (val) {
        if(val.params.type){
          this.tab.active = val.params.type;
        }else{
          this.tab.active = 'all';
        }
      }
    },
    computed: {

    },
    mounted() {
      this.$store.commit('footerhide');
      let type = this.$route.params.type
      if(type === 'recommend' || type === 'time' || type === 'view' || type === 'cn'){
        this.tab.active = type;
      }else{
        this.tab.active = 'all';
      }
    },
    methods: {
      tabClick(index){
        this.tab.active = this.tab.list[index].tag;
        if(index === 0){
          this.$router.replace('/project/0')
        }else{
          this.$router.replace('/project/0/list/' + this.tab.list[index].tag);
        }
      }
    }
  }
</script>
<style>

</style>
