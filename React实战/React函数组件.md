## 踩坑笔记及注意事项
### useEffect 进行异步请求
> async/await的规范有：async 函数通过事件循环来执行异步操作，返回一个promise对象<br/>
react规定 useEffect 需要返回一个清除函数或者无返回值

=> useEffect 的异步请求要不能直接返回，可以通过外层包一层函数/匿名函数
参考链接：https://segmentfault.com/a/1190000020798092

### class 组件在 componentDidMount 里进行异步请求
1. 有子组件情况的渲染顺序：
子组件先render，父组件的异步请求后赋值，子组件触发update（浅拷贝判断对象有没有变化）

