<template>
  <div class="scroll-loading-wrapper" ref="scrollLoadingWrapper" :style="{'overflow-y':scrolly}">
    <div class="loadingUp"
         :style="{'transform': 'translateY(' + uptop +'px)'}"
         ref="loadingUp">
        <span :style="{'transform':'rotate('+ uptop*2 +'deg)'}">
          <i class="refresh"></i>
        </span>
    </div>
    <div class="wrapper" ref="scrollLoadingTouch" >
      <slot></slot>
      <div class="loading" v-show="loading"><i class="refresh"></i>正在加载中</div>
      <div class="loading" v-show="loadingnone">没有内容了</div>
      <div class="fix-refresh" v-show="rotateshow" @click="refresh" :class="{'rotate' : rotate}"><i class="refresh"></i></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'scroll-loading-wrapper',
    props:{
      loading:{
        type:Boolean,
        default:false
      },
      loadingnone:{
        type:Boolean,
        default:false
      },
      rotate:{
        type:Boolean,
        default:false
      },
      rotateshow:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        uptop:0,
        starup:0,
        scrolly:'auto'
      }
    },
    watch:{
      'uptop':function (val) {
        if(val === 0){
          this.scrolly = 'auto';
        }else{
          this.scrolly = 'hidden';
        }
      }
    },
    mounted(){
      //滚动到底部翻页
      let mW = this.$refs.scrollLoadingWrapper;
      let mS = this.$refs.scrollLoadingTouch;
      let lU = this.$refs.loadingUp;
      let that = this;
      mW.onscroll = ()=>{
        if(mW.scrollTop + mW.offsetHeight > mS.offsetHeight){
          if(this.loading === false){
            this.$emit('loadingBottom');
          }
        }
      }
      //下拉刷新
      //滑动时
      mS.addEventListener('touchmove',(e) =>{
        let Y = e.touches[0].clientY;
        if(mW.scrollTop <= 0){
          if(Y - this.starup >= 0){
            that.uptop = Y - this.starup;
          }else{
            that.uptop = 0;
          }
        }
      });
      //触摸时
      mS.addEventListener('touchstart',(e) =>{
        let Y = e.touches[0].clientY;
        that.starup = Y;
      });
      //松开时
      mS.addEventListener('touchend',(e) =>{
        if(that.uptop >= 80){
          this.$emit('slideUpdate')
        }
        that.uptop = 0;
      });
    },
    methods:{
      refresh(){
        this.$emit('slideUpdate')
      }
    }
  }
</script>
<style lang="scss">

</style>
