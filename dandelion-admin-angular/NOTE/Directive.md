# Directive

[官方文档]<https://angular.cn/api/core/Directive>

把一个类标记为 Angular 指令。你可以定义自己的指令来为 DOM 中的元素添加自定义行为。
该选项提供配置元数据，用于**决定**该指令在运行期间要如何处理、实例化和使用。

## 常用的配置

- selector: 这个 CSS 选择器用于触发指令的实例化。

- host: 使用一组键-值对，把**类的属性映射到宿主元素的绑定**（Property、Attribute 和事件）。
  也就是检测到相应的属性的时候，添加对应的属性，常用添加 class：

```ts
  @Directive({
    selector: '[nz-input]',
    host    : {
      '[class.ant-input]'         : 'true',
      '[class.ant-input-disabled]': 'disabled',
      '[class.ant-input-lg]'      : `nzSize === 'large'`,
      '[class.ant-input-sm]'      : `nzSize === 'small'`
    }
  })
  <!-- 这里如果给元素添加属性如下： -->
  <input nz-input placeholder="small size" nzSize="small">
  <!-- 得到的结果就是： -->
  <input _ngcontent-c29="" nz-input="" nzsize="small" placeholder="small size" class="ant-input ant-input-sm">
```
