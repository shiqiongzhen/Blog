- obj.hasOwnProperty(prop)
    - 对待自身属性和继承属性的区别

    ```
    o = new Object();
    o.prop = 'exists';
    o.hasOwnProperty('prop');             // 返回 true
    o.hasOwnProperty('toString');         // 返回 false
    ```
    - 应用：遍历一个对象的所有属性时忽略掉继承属性
