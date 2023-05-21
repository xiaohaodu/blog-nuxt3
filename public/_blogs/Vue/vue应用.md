# vue应用

1. $nextTick()
  dom更新之后延迟回调
  A => B
  $nextTick({
    this.$refs.b.dn()
  })

2. 单页与多页的区别及优缺点

  1. 单页应用(SPA): 只有一个主页面的应用

     组件 => 页面片段
     跳转 => 刷新局部资源
     场景 => PC端

  | 优点                                       | 缺点                                       |
  | ---------------------------------------- | ---------------------------------------- |
  | a. 体验好，快<br />b. 改动内容，不用加载整个页面<br />c. 前后端分离<br />d. 效果可以很炫酷 | a. 不利于SEO<br />b. 初次加载比较慢<br />c. 页面复杂度很高 |

  2. 多页应用：整页刷新

3. v-if与v-for
  v-for优先级 > v-if

4. Vue-router与location.href有什么区别?
  location.href: 简单方便，刷新页面（跳外链）
  Vue-router: 实现了按需加载，减少了dom消耗 （内部页面）
  Vue-router => js原生history

5. params和query

   1. params：

      > name引入 
      > this.$route.parms.xxx
      > 类似于post传参，不显示的，加密的
      > 刷新会丢失数据

   2. query： 

      > path引入 ,
      > this.$route.query.xxx
      > 类似于get传参,显示在浏览器中
      > 刷新不丢失数据

6. created与mounted
  created: 在模板渲染成html之前调用 => 初始化某些值，再渲染成视图
  mounted: 在模板渲染成html之后调用 => 初始化之后，对dom节点的一些操作

7. $route，$router
  $router：是VueRouter的实例 $router.push()
  $route：当前router跳转的对象，当前页的信息 name, path, query,parms

8. Vuex是什么?什么场景使用？数据持久化?
  是什么：全局状态管理，多个组件需要共享数据状态会用到
  场景：音乐播放器，登录状态校验，加入购物车
  数据持久化: 存在本地缓存