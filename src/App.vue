<template>
  <div id="app" v-cloak>
    <div class="main-view" :style="{'padding-bottom':fnav}">
      <router-view></router-view>
    </div>
    <footer-nav v-show="$store.state.footernav.show"></footer-nav>
  </div>
</template>

<script>
  import footerNav from './components/footer-nav/footer-nav.vue'

  export default {
    name: 'app',
    components: {
      footerNav
    },
    computed: {
      fnav() {
        if (this.$store.state.footernav.show) {
          return '1.33333rem';
        } else {
          return '0px';
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  @import "./common/css/base.scss";
</style>
