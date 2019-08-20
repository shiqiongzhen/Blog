- 原则思路抽取出十六个字，即所谓的：重构十六字心法（举例迁移式）
    - 小步修改，测试
    - 不能因为重构代码而引入bug
- 时机：
    - 边开车边换轮胎。重构应该是随时发生的。每一次功能改进都需要进行一点重构
- 作用
    - 代码易读，易修改，易找到bug
    - 减少复用代码
    - 一看变量名和函数名就能知道用途
    - 作用域清晰
- 代码的坏味道
    - 重复代码
    - 过长函数
    - 过大的类
    - 过长参数列
    - 发散式变化
    - 散弹式修改
    - 依恋情结
    - 数据泥团
    - 基本类型偏执
    - 惊悚现身 （使用多态性替换）Parallel Inheritance Hierarchies 平行继承体系Lazy Class 冗赘类Speculative Generality 夸夸其谈未来性Temporary Field 令人迷惑的暂时字段Message Chains 过渡耦合的消息链Middle Man 中间人Inappropriate Intimacy 狎昵关系Alternative Classes with Different Interfaces 异曲同工的类Incomplete Library Class 不完美的库类Data Class 纯稚的数据类Refused Bequest 被拒绝的遗赠Comments 过多的注释
- 重构步骤
    - 一套可靠的测试机制，这些测试必须有自我检验能力
- 疑问
    - 重构与性能冲突：
        - 冲突：重构为了更易于理解和修改，性能优化为了所需性能往往会使代码较难理解；
        - 做法：
            - 重构时不必担心性能，优化时才需要在意。但那时你已经处于有利的位置，有更多选择可以完成有效优化
            - 性能优化放在开发的后期，通过分析工具找出消耗大量时间空间的地方，然后集中精力优化这些地方；（经过分析大部分程序的大半部分时间是运行在一小半代码上，所以对所有代码一视同仁是错误的；）
        - 疑惑：大量短函数调用影响性能？短函数能让编译器的优化功能运转更好，因为短函数更容易被缓存
- 技巧
    - 迁移式
- 第一组重构
    - 提炼函数：
        - 动机：将意图与实现分开
        - 场景：若需要浏览一段代码才能知道其用途，那么提炼函数并根据用途命名
            - 标志：注释=>提炼函数
            ```
            function printOwing(invoice){
                printBanner();
                const outstanding = calculateOutstanding();
                
                //print details
                console.info('name:', invoice.name);
                console.info('amount:', outstanding);
            }
            // 变化
            function printOwing(invoice){
                printBanner();
                const outstanding = calculateOutstanding();
                printDetails(outstanding, invoice);
                
                function printDetails(){
                    console.info('name:', invoice.name);
                    console.info('amount:', outstanding);
                }
            }
            ```
        - 做法：
        1. 创造函数并命名
        2. 提炼代码
        3. 检查变量作用域，是否需要传参到新函数
        4. 编译，找出未被适当处理的变量
        5. 替换代码为新函数
        6. 测试
        7. 复用
        - 范例： 
            - 无局部变量
            - 有局部变量
            - 对局部变量赋值
            ```
            class ExtractMethod1 {
                _name = 'ExtractMethod'

                printOwing() {
                    const arr = [1,2,3]
                    let sum = 0
                
                    arr.forEach(item => {
                    sum += item
                    })
                    
                    //print details
                    console.log(`name: ${this._name}`)
                    console.log(`amount: ${sum}`)
                }
            }
            // 变化后
            class ExtractMethod3 {
                _name = 'ExtractMethod'
                printOwing() {
                    const sum = this.getOutStanding()
                    this.printBanner()
                    this.printDetails(sum)
                }
                getOutStanding() {
                    const arr = [1,2,3]
                    let sum = 0
                    arr.forEach(item => {
                    sum += item
                    })
                    return sum
                }
                printDetails(sum) {
                    console.log(`name: ${this._name}`)
                    console.log(`amount: ${sum}`)
                }
            }

            ```

    - 内联函数：
        - 动机：去除不必要间接层/委托层，降低系统复杂度
        - 场景：
        1. 函数内部代码和函数名一样清晰易读
        2. 手头有一群组织不合理的函数，将他们都内联到一个大型函数，再重新提炼
        3. 删除无用间接层
            ```
            function getRating(driver){
                return moreThanFiveDeliveries(driver) ? 2 : 1;
            }

            function moreThanFiveDeliveries(driver){
                return driver.deliveries > 5;
            }
            //变化
            function getRating(driver){
                return driver.deliveries > 5 ? 2 : 1;
            }
            ```
        - 做法：
        1. 检查函数，确定它不具有多态性（若有子类继承此函数，则无法内联（方法被继承））
        2. 找出这个函数的所有调用点
        3. 将调用点都替换成函数本体
        4. 测试
        5. 删除函数定义
    - 提炼变量
        - 动机：提高表达式的可读性

            ```
            return order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100);
            // 变化
            const basePrice = order.quantity * order.itemPrice;
            const quantityDiscount =  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
            const shipping = Math.min(basePrice * 0.1, 100);
            return basePrice - quantityDiscount + shipping;
            ```
        - 做法：
        1. 确认要提炼的表达式没有副作用
        2. 声明一个不可修改的变量，把你想要提炼的表达式复制一份，将结果值赋值给变量
        3. 用新变量取代原表达式
        4. 测试
        - 范例： 
            - 函数提变量
            - 类提方法（若为公用的行为）
    - 内联变量
        - 动机：去除不必要变量
        - 场景：表达式比变量更有表现力
            ```
            const basePrice = order.basePrice; // 注意，这里是const
            return basePrice > 1000;
            // 变化
            return order.basePrice > 1000;
            ```
        - 做法：
        1. 检查确认变量赋值语句的右侧表达式没有副作用
        2. 保证变量不可修改（确保该变量只被赋值一次）
        3. 替换第一处使用变量的地方
        4. 测试
        5. 逐一替换
        6. 删除声明点和赋值语句
        7. 测试
    - 改变函数声明
        - 动机：快速知道用途
            ```
            function circum(radius){ // 圆
                return 2*Math.PI*radius;
            } 
            //变化
            function circumference(radius){ // 圆周长
                return 2*Math.PI*radius;
            } 
            ```
        - 做法：
        1. 移除参数前确定函数内没有被使用
        2. 修改函数声明（迁移始做法，防止名字不唯一）
        3. 逐一替换
        4. 测试

        - 范例： 
            - 修改函数名
            ```
            function circum(radius){
                return circumferrence(radius)
            } // 圆
            function circumferrence(radius){
                return 2*Math.PI*radius;
            }
            //变化
            function circumference(){} // 圆周长
            ```
            - 添加函数参数（设置了上下文，看出函数处理范围：人，公司）
                - 如何选择正确的参数
            ```
            function addReservation(customer){
                return this._reservation.push(customer)
            } 
            //变化
            function addReservation(customer){
                return circumferrence(customer,false)
            } 
            function zz_addReservation(customer,isPriority){
                assert(isPriorty===true || isPriority===false)
                return this._reservation.push(customer)
            }
            ```
            - 把参数改成属性

    - 封装变量
        - 动机：控制作用域，可以更好的封装行为
            重构数据转移为重构函数，更易于处理
            监控数据的变化和使用情况
        - 场景：
        1. 如果数据的可访问范围大（数据搬走无法设计成项函数那样的转发机制）
        2. 对于所有可变的数据，只要它的作用域超过单个函数（笔者习惯，数据作用域越大，封装就越重要，。。。，强调私有的原理，控制访问范围）
            ```
            let defaultOwner = {};
            // 变化后
            let defaultOwner = {};
            export function defaultOwner(){
                return defaultOwner;
            }
            export function getDefaultOwner(arg){
                defaultOwner = arg;
            }
            ```
        - 做法：
        1. 创建封装函数
        2. 执行静态检查？
        3. 逐一替换成封装函数，每次替换都测试
        4. 限制变量的可见行
        5. 测试
        - 范例： 
            - 
    - 变量改名
        - 动机：好名字可让上下文更清晰
            ```
            const a = height * width;
            // 变成
            const area = height * width;
            ```
        - 做法：
         1. 
        - 范例：
    - 引入参数对象
        - 动机：组织数据结构，让数据项之间的关系更清晰，参数列表也能缩短
        - 场景：一个函数接受多个参数
            ```
            function invoice(startDate, endDate){}
            function received(starDate, endDate){}
            //变成
            function invoice(dateRange){}
            function received(dateRanges){}
            ```
        - 做法：
        1. 
        - 范例： 
    - 函数组合成类
        - 动机：
        1. 对象内部调用这些函数可以少传参数，从而简化函数调用，而且一个对象可更方便传递给系统的其他部分
        2. 客户端修改对象的核心数据，通过计算得出的派生数据会自动与核心数据保存一致
        - 场景：如果一组函数形影不离地操作同一块数据（通常是将这块数据作为参数传递给函数）
            ```
            function base(reading){}
            function taxableCharge(reading){}
            function calcBaseCharge(reading){}
            // 变成
            class Reading{
                base(){}
                taxableCharge(){}
                calcBaseCharge(){}
            }
            ```
        - 做法：
        1. 
        - 范例： 
    - 拆分阶段
        - 动机：保证单一原则，一段代码只做一件事
        - 场景：如果一段代码同时处理两件或者更多不同的事情
            ```
            const orderArr = orderStr.split(/\s+/);
            const productPrice = priceList(order[0].split('-')[1]);
            const orderPrice = parseInt(orderArr[1]) * productPrice;
            // 变成
            const orderRecord = parseOrder(order);
            const orderPrice = price(orderRecord, priceList);

            function parseOrder(str){
                const values = str.split(/\s+/);
                return {
                    priceId: values[0].split('-')[1],
                    quantity: parseInt(values[1]) 
                };
            }

            function price(order, priceList){
                return order.quantity * priceList[order.productId];
            }
            ```
        - 做法：
        1. 
        - 范例： 