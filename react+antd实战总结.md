- 前言：一星期后即将开发的需求需要用到的技术栈是react+antd+es6+Typescript，而我之前只接触了vue+es6+JavaScript，接下来总结下我一星期的学习和两周的开发。
- 熟悉react基础
  - props和state
     - props是子父组件进行通信的媒介，父组件将值赋给子组件，**和vue一样，子组件通过props可以获取到父组件的传值**。
     - 而state是组件自身的变量，在构造函数里定义，作为全局变量在组件中使用，而父组件传来的props参数是不可变的。**注意：改变state需要用到setState()方法，而这个方法是一个异步的**，而且每次调用都会改变状态，更新视图，也就是会调用render方法。
   - 生命周期
    这里附上一张图，每次遇到生命周期的问题，一看这张图，一目了然。**上面的黑框**部分是页面加载阶段（从框框可以得出的信息是，先获取父组件的传值props，再初始化state，再调用willMount钩子，以此类推）。而**左下角的黑框**是当props值和state值改变，导致的更新流程，它会调用一系列的钩子函数，再调用render更新视图。而**右下角的黑框**是销毁过程。
![image.png](https://upload-images.jianshu.io/upload_images/11327353-69c3c5445e4992fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - jsx的渲染方式
jsx一种 JavaScript 的语法扩展，在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象，所以可以在html结构里任意穿插js语法，有点像模版语言
  - react单向流动的特点
于vue不同的是，vue有model语法糖可以实现数据双向绑定，而react里不存在model。你会发现用eslint规范后的react组件可以很清晰明确的看出react组件数据的流入和流出，**props值可以看到数据的流入，state可以看到整个组件自身的变量**（我记得当时我在调用render函数前调用了一个自定义的init函数，但是当我想把值传给方法外部使用时，出现了在render前不能改变state的值，所以我想暴露出去的值只能通过return出去后传给构造函数里的state初始化，所以我想在全局流动的值又得回到了state）。
  - 子组件怎么传值给父组件
这个可以在父组件定义onchange方法，然后在子组件调用this.props.onchange方法传值即可。
  - 事件处理
    - react里的function方法没有this，如果想要this，那么只能通过bind绑定或者使用箭头函数。
![image.png](https://upload-images.jianshu.io/upload_images/11327353-ae06502057b3d6e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    - 值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
    - 还有一个巨坑，不能在render的方括号里使用类似于onClick={this.handleClick()}的语法，它会解析成一个函数在render的时候直接执行，若handleClick有改变状态语句，则又会render，然后就死循环了。