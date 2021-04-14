- HTML 标签 vs 组件
    - 首字母大小写区别：React 不但能渲染 HTML 标签（strings）也能渲染 React 组件（classes）。JavaScript 触发这些的原理是不同的（React.createElement('div') vs React.createElement(MyComponent)），确定使用哪一种方式取决于首字母的大小写，foo 被认为是 HTML 标签，Foo 被认为是一个组件
- Jsx
    - 是个表达式
    - 是个对象{ type: ...}
- 组件定义
    - 函数式组件
    ```
    type Props = {
        foo: string;
    };

    const MyComponent: React.FunctionComponent<Props> = props => {
        return <span>{props.foo}</span>;
    };

    <MyComponent foo="bar" />;
    ```
    - 类组件
    ```
    type Props = {
        foo: string;
    };

    class MyComponent extends React.Component<Props, {}> {
        render() {
            return <span>{this.props.foo}</span>;
        }
    }

    <MyComponent foo="bar" />;
    ```
- ts
    - 基于deno服务