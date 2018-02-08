
export default {
  //新闻
  news:{
    list: '/action/openapi/news_list',
    detail: '/action/openapi/news_detail',
  },
  //搜索
  search:{
    list: '/action/openapi/search_list'
  },
  //博客
  blog:{
    list:'/action/openapi/blog_list',
    user:'/action/openapi/user_blog_list',
    recommend_list:'/action/openapi/blog_recommend_list', //推荐博客
    detail:'/action/openapi/blog_detail',
    delete:'/action/openapi/user_blog_delete'//删除用户博客
  },
  //动弹
  tweet:{
    list:'/action/openapi/tweet_list',
    detail:'/action/openapi/tweet_detail',
    pub:'/action/openapi/tweet_pub',
    delete:'/action/openapi/tweet_delete',
  },
  //软件
  project:{
    catalog_list:'/action/openapi/project_catalog_list',  //软件分类列表(只有2级)
    tag_list:'/action/openapi/project_tag_list',  //Tag下的软件列表
    list:'/action/openapi/project_list',   //软件分类下的的软件列表
    detail:'/action/openapi/project_detail'
  },
  //评论
  comments:{
    news:{
      list:'/action/openapi/comment_list',
      pub:'/action/openapi/comment_pub',
      reply:'/action/openapi/comment_reply',
      delete:'/action/openapi/comment_delete'
    },
    blog:{
      list:'/action/openapi/blog_comment_list',
      pub:'/action/openapi/blog_comment_pub',
      reply:'/action/openapi/blog_comment_reply',
    }
  },
  //收藏
  follow:{
    add:'/action/openapi/favorite_add',
    remove:'/action/openapi/favorite_remove',
    list:'/action/openapi/favorite_list'
  },
  // 用户
  user:{
    myuserinfo:'/action/openapi/user',
    myindex:'/action/openapi/my_information',
    myimg:'/action/openapi/portrait_update',
    userinfo:'/action/openapi/user_information',
    dongtailist:'/action/openapi/active_list',
    friend:{
      list:'/action/openapi/friends_list',
      follow:'/action/openapi/update_user_relation'
    }

  },
  //私信
  message:{
    list:'/action/openapi/message_list',
    delete:'/action/openapi/message_delete'
  },
  //通知
  notice:{
    list:'/action/openapi/user_notice',
    clear:'/action/openapi/clear_notice'
  },
  //好友列表
  friends:{
    list:'/action/openapi/friends_list'
  },
  //帖子
  post:{
    list:'/action/openapi/post_list',
    detail:'/action/openapi/post_detail'
  }
}
