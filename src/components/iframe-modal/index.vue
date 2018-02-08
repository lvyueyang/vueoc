<template>
  <div class="iframe-modal" v-if="show">
    <div class="iframe-header">
      <i class="iconfont icon-back"></i>
      <i class="iconfont icon-more"></i>
      <i class="iconfont icon-close" @click="show = false"></i>
    </div>
    <div class="iframe-body">
      <iframe :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'IframeModal',
    props: {
      url: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss">

</style>
