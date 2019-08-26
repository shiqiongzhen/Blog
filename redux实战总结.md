# 学习
- 我的理解
    - redux： 相当于封装变量，监控变量，增加行为
    - redux作用：不用刷新页面，就能实时监听每个页面数据state变化，且每个页面的数据相互独立
    ![redux](./img/redux.png)
- Store 
    - 保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store
    - Store & State区别： 一个 State 对应一个 View，而整个应用只能有一个 Store
    - 方法
        - store.getState()
        - store.dispatch()
        - store.subscribe()
- state
    - 一个 State 对应一个 View, 保证每个View之间数据独立，不干扰
- action：对象，触发state变化的条件
    - Action Creator：**创建一个action对象**，下面的例子中addTodo相当于一个creator
    ```
    let store = createStore(todoApp, window.STATE_FROM_SERVER)
    ```
    - store.dispatch：
        - 传入*一个新的action对象*（是 View 发出 Action 的*唯一*方法）
        - **触发Reducer的自动执行**
        ```
        store.dispatch(addTodo('Learn Redux'));
        ```
- reducer：
    - 接受action和state，**生成新的state**
    - 为什么要生成新的state对象
    > 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象
    - 为什么这个函数叫做 Reducer 呢？
    > 因为它可以作为数组的reduce方法的参数。
    > ```
    > const actions = [
    > { type: 'ADD', payload: 0 },
    > { type: 'ADD', payload: 1 },
    > { type: 'ADD', payload: 2 }
    > ];
    > 
    > const total = actions.reduce(reducer, 0); // 3
    > ```
    - payload是什么
        - 携带的信息
    - 纯函数
        - 不得改写参数
        - 不能调用系统 I/O 的API
        - 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
    - subscribe方法
        - 设置监听函数
- 计时器demo
```
// view
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

// reducer-返回变化后的新state
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};
// 创建新的store
const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'} )} 
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
```
- 能让我看懂的入门文档（bs：还是我老大哥厉害）
    http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
# 实战
