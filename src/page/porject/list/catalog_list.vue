<template>
  <main class="catalog-list">
    <div class="link-list last-noborder">
      <div class="item"
           @click="link(v.tag)"
           v-for="(v,index) in list"
           :key="v.tag">
        <div class="content">
          <div>{{v.name}}</div>
          <i class="iconfont icon-more"></i>
        </div>
      </div>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../../components/header-nav/header-nav.vue'
  import api from '../../../common/js/api/api'

  export default {
    name: 'CatalogList',
    data() {
      return {
        tag:'all',
        list:[]
      }
    },
    components: {
      headerNav
    },
    watch:{
      '$route':function(){
        this.tag = this.$route.params.tag;
        this.getlist();
        this.$store.commit('footerhide');
      }
    },
    computed: {},
    mounted() {
      this.$store.commit('footerhide');
      this.tag = this.$route.params.tag;
      this.getlist();

    },
    methods: {
      getlist(){
        let token = localStorage.getItem('access_token');;
        let tag = this.tag;

        this.$http.post(api.project.catalog_list, {
          'access_token': token,
          'tag':tag
        }).then(res => {
          this.list = res.data.softwareTypes;
        })
      },
      link(tag){
        let tags = this.$route.params.tag;
        if(tags == 0){
          this.$router.push('/project/' + tag);
        }else{
          this.$router.push('/project/0/list/' + tag);
        }
      }
    }
  }
</script>
<style>

</style>
