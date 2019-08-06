#### 改变路由的方式有很多种，那么他们之间的区别是什么呢？
###### 页面跳转>客户端跳转`(其他：服务端跳转)`>js，html跳转`(其他：http跳转)`
- 使用react-router改变路由
  - 原理：使用diff算法，将变化的组件进行重新挂载，没有变化的组件只会调用其render方法，最大限度的提高效率
  - 方式：
    - link to
    - browserhistory.push
    - this.props.router.push

- 使用react-router-redux改变路由(待总结)
push方法（react-router-redux）

- 使用<a />标签
  - 特点：页面上所有的组件都会重新的挂载。

- 使用window对象的属性：history和location

  - history.push
    - 特点：history记录了从窗口打开开始的所有浏览历史
    - history其他方法：go,..
  - location.href
    - location其他方法：hash,..
