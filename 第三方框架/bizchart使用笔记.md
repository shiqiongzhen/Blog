### bizchart
#### DataSet类
- State: 在 G2 3.0 中使用 DataSet 的状态量 (State) 可以很容易的实现图表的联动
    - 描述：存储数据集上的状态量（key-value对）
    - 创建 DataSet 对象，指定状态量
        ```
        const ds = new DataSet({
            state: {
                year: '2010'
            }
        });
        ```
    - 创建 DataView 对象，在 transform 中使用状态量
    - 创建图表，引用前面创建 DataView
    - 改变状态量，所有 DataView 更新
- Views
    - 描述：存储所有挂在数据集上的数据视图（key-value对）
    - new View()数据视图构造函数
        ```
        const dv = new DataSet.View(ds, options = {}) 
        ```
        - dv.source(data, options) 载入数据
            ```
            const dv = new DataSet.View().source(testCSV, {
                type: 'csv'
            });
            ```
        - dv.[Transform](https://bizcharts.net/product/bizcharts/category/7/page/39): 一个数据视图（DataSet.View）通过 Transform 来进行数据转换操作
            - 静态处理相关
                - filter 数据过滤
                - map 数据加工
                - pick 字段过滤
                - rename 字段重命名
                - reverse 逆序排列
                - sort 数据排序
                - ...
            - 数据形变 / 数据补全相关
                - fill-rows 补全行
                    ```
                    const dv = new DataSet.View().source(data)
                    .transform({
                        type: 'fill-rows',
                        groupBy: [ 'a' ],
                        orderBy: [ 'b' ],
                        fillBy: 'group' // 默认为 group，可选值：order
                    });
                    ```
                - impute 补全列 / 补全字段
                    - 补全字段的规则（method）有常见的统计函数：max, min, median, mean, 固定值
                    ```
                    const dv = new DataSet.View().source(data)
                    .transform({
                        type: 'impute',
                        field: 'y',       // 待补全字段
                        groupBy: [ 'x' ], // 分组字段集（传空则不分组）
                        method: 'max'     // 补全字段值时执行的规则
                    });
                    ```
                - fold字段展开
                    ```
                    const data = [
                    { country: "USA", gold: 10, silver: 20 },
                    { country: "Canada", gold: 7, silver: 26 }
                    ];
                    const dv = ds.createView()
                    .source(data)
                    .transform({
                        type: 'fold',
                        fields: [ 'gold', 'silver' ], // 展开字段集
                        key: 'key',                   // key字段
                        value: 'value',               // value字段
                        retains: [ 'country' ]        // 保留字段集，默认为除 fields 以外的所有字段
                    });
                    /*
                    dv.rows 变为
                    [
                    { key: gold, value: 10, country: "USA" },
                    { key: silver, value: 20, country: "USA" },
                    { key: gold, value: 7, country: "Canada" },
                    { key: silver, value: 26, country: "Canada" }
                    ]
                    */
                    ```
            - 数据比例（百分比）相关
                - percent 总和百分比
            - 数据统计相关
            - ...