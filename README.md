###vue-oc开发手册
本项目使用vue+开源中国openapi开发制作，仿照开源中国的app,使用sass编；  
业余时间开发，具体周期不确定，代码会有些乱，不定期会改良，希望各位大神能够多多指正，谢谢；  

>项目地址：  [https://gitee.com/lvyueyang/vue-oc](https://gitee.com/lvyueyang/vue-oc "Vue-OC")  
项目体验地址：[http://lvyueyang.gitee.io/vue-oc/dist](http://lvyueyang.gitee.io/vue-oc/dist/#/ "Vue-OC")  
![Alt text](./static/ocvue.png )  
>联系QQ：975794403   

>npm install  下载依赖  
>npm run dev  运行项目

下面请看目录结构 src目录  

```
├─common              包含css，js，img
│  ├─css
│  │  │  base.scss    css入口文件
│  │  │  
│  │  └─template      css模块文件
│  │          admin.scss    个人中心
│  │          app.scss      
│  │          button.scss    摁钮样式
│  │          checkbox-radio-switch.scss  多选，单选，开关
│  │          comments-list.scss          评论列表
│  │          comments-modal.scss         评论模态框
│  │          footer-comments.scss        底部评论悬浮，关注，分享
│  │          footer-nav.scss             底部主菜单
│  │          frames.scss                 动画（没有用到）
│  │          function.scss               函数（rem计算函数）
│  │          header-nav.scss             顶部导航栏
│  │          home.scss                   主页
│  │          iframe-modal.scss           iframe加载框模拟打开外链
│  │          link-list.scss              链接列表
│  │          login.scss                  登陆
│  │          main.scss                    
│  │          mixin.scss                  混合
│  │          pop.scss                    提示信息框
│  │          post.scss                   帖子
│  │          project.scss                软件
│  │          reset.scss                  重置样式
│  │          scroll-loading.scss         上拉刷新下拉加载
│  │          search-wrapper.scss         搜索页
│  │          side-bar.scss               
│  │          swiper.scss                 轮播
│  │          tweet.scss                  动弹
│  │          var.scss                    变量
│  │          
│  ├─img                                  图片资源
│  │  │  refresh.svg
│  │  │  
│  │  └─dm
│  │          banner.jpg
│  │          login-bg.jpg
│  │          project-logo.svg
│  │          
│  └─js
│      │  filters.js                      过滤器
│      │  imgCompressBase64.js            图片转base64
│      │  rem.js                          rem插件
│      │  scroll.js                       滚动加载
│      │  
│      └─api
│              api.js                     api接口列表
│              
├─components                              组件
│  ├─comments-modal                       评论模态框
│  │      index.vue
│  │      
│  ├─footer-comments                      底部悬浮评论，收藏，分享
│  │      footer-comments.vue
│  │      
│  ├─footer-nav
│  │      footer-nav.vue                  底部悬浮菜单
│  │      
│  ├─header-nav                           底部导航
│  │      header-nav.vue
│  │      
│  ├─iframe-modal                         iframe打开外链模态框
│  │      index.js
│  │      index.vue
│  │      
│  ├─pop                                  消息模态框
│  │  └─msg
│  │          msg.js
│  │          msg.vue
│  │          
│  └─scroll                               上拉刷新，下拉加载
│          scroll-loading.vue
│          
├─page                                    页面文件夹
│  │  login.vue                           登录页
│  │  
│  ├─admin                                个人中心
│  │  │  index.vue                        入口
│  │  │  zuozhe.vue                       作者信息
│  │  │  
│  │  ├─myblog                            我的博客
│  │  │      index.vue
│  │  │      
│  │  ├─myfollow                          我的关注
│  │  │      index.vue
│  │  │      
│  │  ├─myfriends                         我的好友
│  │  │      index.vue
│  │  │      
│  │  ├─myinfo                            我的资料
│  │  │      index.vue
│  │  │      
│  │  ├─mymessage                         我的消息
│  │  │      index.vue
│  │  │      
│  │  └─myset                             设置
│  │          index.vue
│  │          
│  ├─comments                             评论列表
│  │      comment-list.vue
│  │      
│  ├─detail                             
│  │  ├─blog                              博客详情
│  │  │      index.vue
│  │  │      
│  │  └─news                              新闻详情
│  │          index.vue
│  │            
│  ├─home                                 主页（新闻列表，博客列表）
│  │      home.vue
│  │      
│  ├─more                                 发现
│  │      index.vue
│  │      
│  ├─porject                              发现>软件
│  │  │  detail.vue                       发现>软件>详情
│  │  │  index.vue                        发现>软件
│  │  │  
│  │  └─list
│  │          catalog_list.vue            发现>软件>分类列表
│  │          list.vue                    发现>软件>其他列表
│  │          
│  ├─post
│  │      detail.vue                      帖子详情
│  │      index.vue                       帖子列表
│  │      
│  ├─search                               搜索
│  │      index.vue
│  │      
│  ├─tweet                    
│  │      detail.vue                      动弹详情
│  │      list.vue                        动态列表
│  │      tweet-pub.vue                   发布动弹
│  │      
│  └─user
│          index.vue                      其他用户
│          
├─router
│      index.js                           路由
│      
└─store
    │  index.js                           vuex
    │  
    └─modules
            footer.js                     底部导航菜单
            msg-modal.js                  消息
            openInfo.js                    
            tweet.js                      动弹
```
