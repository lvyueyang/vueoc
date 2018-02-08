<template>
  <div class="comments-modal" @click.self="close">
    <div class="wrapper">
      <!--输入框-->
      <div class="textarea" contenteditable="true" :input="value" @input="updateValue($event.target.innerHTML)">
      </div>
      <span v-if="value.length === 0" class="placeholder">发表评论</span>
      <div class="error">{{error}}</div>
      <!--操作栏-->
      <div class="operates">
        <div class="left">
          <div class="aite" @click="aite">
            <!--<i class="iconfont icon-icon_aiye"></i>-->
          </div>
          <div class="checkbox flex">
            <input type="checkbox" v-model="check" @change="checkUpdate">
            <i></i>
            <label>转发到动弹</label>
          </div>
        </div>
        <!--提交摁钮-->
        <button class="btn" :disabled="value.length > 0 ? false : true" @click="submit">发送</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'commentsModal',
    props:['value','checked','error'],
    data(){
      return {
        check:false
      }
    },
    methods:{
      //选中
      checkUpdate(){
        this.$emit('update:checked',this.check);
      },
      //绑定输入框
      updateValue(value){
        this.$emit('input', value);
      },
      //提交事件
      submit(){
        if(this.value.length > 0){
          this.$emit('submit');
        }
      },
      //艾特
      aite(){
        this.$emit('aite');
      },
      //关闭
      close(){
        this.$emit('close');
      }
    }
  }
</script>
<style lang="scss">

</style>
