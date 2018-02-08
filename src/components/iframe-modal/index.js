import IframModalComponents from './index.vue'

const iframModal = {
  install(Vue){
    let $vm;
    if (!$vm) {
      const IframModalPlugin = Vue.extend(IframModalComponents);
      $vm = new IframModalPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    $vm.show = false;
    let iframe = {
      show(url){
        $vm.show = true;
        $vm.url = url;
      }
    };
    if (!Vue.$iframeModal) {
      Vue.$iframeModal = iframe;
    }

    Vue.mixin({
      created() {
        this.$iframeModal = Vue.$iframeModal;
      }
    })
  }
};

export default iframModal;
