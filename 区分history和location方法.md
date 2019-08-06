## 改变路由的方式有很多种，那么他们之间的区别是什么呢？
- 使用react-router改变路由

link to
browserhistory.push


- 使用react-router-redux改变路由

push方法（react-router-redux）


- 使用html标签

a


- 使用window对象的属性：history和location

  - history.push
  history记录了从窗口打开开始的所有浏览历史
    - history其他方法：go,..
  - location.href
    - location其他方法：hash,..
