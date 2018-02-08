import Vue from 'vue'
import Router from 'vue-router'
//主页
import Home from '../page/home/home.vue'
//搜索
import Search from '../page/Search/index.vue'
//详情
import NewsDetail from '../page/detail/news/index.vue'  //详情-新闻
import BlogDetail from '../page/detail/blog/index.vue'  //详情-博客
//评论
import CommentsList from '../page/comments/comment-list.vue'
//个人中心
import Admin from '../page/admin/index.vue'
//我的资料
import MyInfo from '../page/admin/myinfo/index.vue'
//我的消息
import MyMessage from '../page/admin/mymessage/index.vue'
//我的好友
import MyFriends from '../page/admin/myfriends/index.vue'
//我的收藏
import MyFollow from '../page/admin/myfollow/index.vue'
//用户博客
import UserBlog from '../page/admin/myblog/index.vue'
//作者信息
import ZuoZhe from '../page/admin/zuozhe.vue'
//设置
import Myset from '../page/admin/myset/index.vue'
//用户信息
import User from '../page/user/index.vue'
//动弹
import Tweet from '../page/tweet/list.vue'
import TweetDetail from '../page/tweet/detail.vue'
import TweetPub from '../page/tweet/tweet-pub.vue'

//发现更多
import More from '../page/more/index.vue'

//登陆
import Login from '../page/login.vue'

//开源软件
import Project from '../page/porject/index.vue'
  import ProjectCatalogList from '../page/porject/list/catalog_list.vue'
  import ProjectList from '../page/porject/list/list.vue'
//开源软件详情
import ProjectDetail from '../page/porject/detail.vue'

//帖子
import Post from '../page/post/index.vue'
import PostDetail from '../page/post/detail.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/newsdetail/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      meta:{
        nofooternav:true
      }
    },
    {
      path: '/blogDetail/:id',
      name: 'BlogDetail',
      component: BlogDetail,
      meta:{
        nofooternav:true
      }
    },
    {
      path: '/commentsList/:type/:id',
      name: 'CommentsList',
      component: CommentsList,
      meta:{
        nofooternav:true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/mymessage',
      name: 'MyMessage',
      component: MyMessage
    },
    {
      path: '/myfriends/:type',
      name: 'MyFriends',
      component: MyFriends
    },
    {
      path: '/myfollow',
      name: 'MyFollow',
      component: MyFollow
    },
    {
      path: '/tweet',
      name: 'Tweet',
      component: Tweet
    },
    {
      path: '/tweetDetail/:id',
      name: 'TweetDetail',
      component: TweetDetail
    },
    {
      path: '/tweetPub',
      name: 'TweetPub',
      component: TweetPub
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
      children:[
        {
          path: '/project/:tag',
          name: 'ProjectCatalogList',
          component: ProjectCatalogList,
        },
        {
          path: '/project/:tag/list/:type',
          name: 'ProjectList',
          component: ProjectList,
        }
      ]
    },
    {
      path:'/projectDetail/:id',
      name: 'ProjectDetail',
      component: ProjectDetail,
    },
    {
      path:'/postDetail/:id',
      name: 'PostDetail',
      component: PostDetail,
    },
    {
      path:'/userBlog/:id',
      name: 'UserBlog',
      component: UserBlog,
    },
    {
      path:'/user/:id',
      name: 'User',
      component: User,
    },
    {
      path:'/search',
      name: 'Search',
      component: Search,
    },
    {
      path:'/set',
      name: 'Myset',
      component: Myset,
    },
    {
      path:'/zuoZhe',
      name: 'ZuoZhe',
      component: ZuoZhe,
    }
  ]
})
