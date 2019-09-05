- obj.hasOwnProperty(prop)
    - 对待自身属性和继承属性的区别

    ```
    o = new Object();
    o.prop = 'exists';
    o.hasOwnProperty('prop');             // 返回 true
    o.hasOwnProperty('toString');         // 返回 false
    ```
    - 应用：遍历一个对象的所有属性时忽略掉继承属性
- rest运算符&扩展运算符
    - rest运算符:用于解构数组和对象(收缩)
        - rest参数必须在最后一位定义
    - 扩展运算符:(展开)
        - 展开数组
        var a=[1,2]
        var b=Math.max(...a)
        - 合并数组
        ```
        var a=[1,2]
        var b=[3,4]
        var c=[...a,...b]
        ```
        - 拷贝数组
        ```
        var a=[1,2]
        var b=[...a]
        ```

- 对象属性访问
    - 注意区分点访问和[]访问
    ```
    var a={head:1}
    a.head  //1
    a["head"]  //1
    a[head]  //报错

    var headObject="head"
    a[headObject] // 1
    a.headObject  // 报错
    ```
