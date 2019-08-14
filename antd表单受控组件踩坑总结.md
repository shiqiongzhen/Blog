- 一个受控组件只能注册一次（如果在调用render前调用了init函数，并且init函数需要设置数控组件，则也要注册一次）
- 使用 getFieldsValue getFieldValue setFieldsValue 等时，应确保对应的 field 已经用 getFieldDecorator 注册过了
- 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
- 让我们来看看antd官方文档对getFieldDecorator的使用介绍
  - this.props.form.getFieldDecorator(id, options)[#](https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options))

经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1.  你**不再需要也不应该**用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。

2.  你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。

3.  你不应该用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。
