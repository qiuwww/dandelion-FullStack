# Component 相关内容

[TOC]

## 常用标签

### ng-template

可以添加 #id 便于在指令中使用**当前的模块**，**嵌入 ng-container 中才会展示**。

- `<ng-template>`的功能与`<template>`元素类似，都是一个默认隐藏的元素。
- 在 Angular 里，通常将它当作一个**嵌入式的模版**。
- 区别在与`ng-template`渲染之后什么也没有，`template`是一个自带 display:none 的隐藏元素，可以操作。

```html
<ng-template #temp>
  测试文本
</ng-template>
<template>
  测试文本
</template>
```

### ng-content

Angular2 使用`<ng-content>`元素作**内容映射**，所谓内容映射，是指在组件**内嵌入模版代码**，方便定制**可复用的组件**。

类比于 vue 的 slot。

表示当前的组件内部嵌入的内容要存放的位置：

```html
<!-- 位置关系 -->
<app-wrapper>
  <app-counter></app-counter>
</app-wrapper>

<!-- 组件 app-wrapper -->
<h1>Test ng-content</h1>
<ng-content></ng-content>

<!-- 组件 app-counter -->
<div>counter</div>
<!-- 结果 -->

<h1>Test ng-content</h1>
<div>counter</div>
```

### ng-container

仅仅是一个特殊的 tag，**充当载体的作用**。

`<ng-container>`并不存在，它仅仅是作为一个容器使用。

由于 ng 中每个标签只能使用一个指令，这个时候就需要一个不渲染的 tag 来组装代码。

ng 中常见错误之一的 for 和 if 不能写在同一标签上（在一个宿主元素上只能应用一个结构型指令），利用 ng-container 标签可以在实现功能的基础上减少层级的嵌套。

#### 与 ng-template 对比

```html
<ng-template [ngIf]="true">
  <p>ngIf with a ng-template.</p>
</ng-template>

<ng-container *ngIf="true">
  <p>ngIf with an ng-container.</p>
</ng-container>

<!-- 输出结果 -->
ngIf with a ng-template. ngIf with an ng-container.
```

`<ng-template>` ：使用 \* 语法糖的**结构指令**，最终都会转换为 `<ng-template>` 或 `<template>` 模板指令，模板内的内容如果不进行处理，是不会在页面中显示的。

`<ng-container>`：是一个**逻辑容器**，**可用于对节点进行分组**，但不作为 DOM 树中的节点，它将被渲染为 HTML 中的 comment 元素，它可用于避免添加额外的元素来使用结构指令。

注意：`<ng-template>`是 angular4 的标签，`<template>`是 angular2 的标签。

#### 结合使用

```html
<ng-container *ngIf="showSearchBread; else tplSearchEmpty">
  暂时搜索不到您要的数据喔
</ng-container>
<ng-template #tplSearchEmpty>
  快快开始获取吧！
</ng-template>
```

### NgTemplateOutlet

[官方文档](https://angular.cn/api/common/NgTemplateOutlet)

**根据一个提前备好的 TemplateRef 插入一个内嵌视图**。对比`ng-content`。

```html
<!-- 内层 -->
<ng-container *ngTemplateOutlet="greet"></ng-container>
<!-- 外层 -->
<ng-template #greet><span>Hello</span></ng-template>
```

## 组件结构

- Angular 的组件是指令的一个子集，它总是有一个与之关联的模板。
- **继承自 Directive 装饰器**。

### 类的装饰器 @Component

[官方文档]<https://angular.cn/api/core/Component>
一个装饰器，用于把某个类标记为 Angular 组件，并为它配置一些元数据，以决定该组件在运行期间该如何处理、实例化和使用。

```ts
@Component({
  // Directive 这个 CSS 选择器用于触发指令的实例化。
  selector           : 'nz-input-group',
  // 为 true 则保留，为 false 则从编译后的模板中移除可能多余的空白字符。 空白字符就是指那些能在 JavaScript 正则表达式中匹配 \s 的字符。默认为 false，除非通过编译器选项改写了它。
  preserveWhitespaces: false,
  // 供模板和 CSS 样式使用的样式封装策略。 封装；包装
  encapsulation      : ViewEncapsulation.None,
  // 用于当前组件的变更检测策略。
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-input-group.component.html',
  // 使用一组键-值对，把类的属性映射到宿主元素的绑定（Property、Attribute 和事件）。
  host               : {
    '[class.ant-input-group-compact]'      : 'nzCompact',
    // 如下如果元素中有nzSearch，就转化为添加对应的class
    '[class.ant-input-search-enter-button]': 'nzSearch',
    '[class.ant-input-search]'             : 'nzSearch',
    '[class.ant-input-search-sm]'          : 'isSmallSearch',
    '[class.ant-input-affix-wrapper]'      : 'isAffixWrapper',
    '[class.ant-input-group-wrapper]'      : 'isAddOn',
    '[class.ant-input-group]'              : 'isGroup',
    '[class.ant-input-group-lg]'           : 'isLargeGroup',
    '[class.ant-input-group-wrapper-lg]'   : 'isLargeGroupWrapper',
    '[class.ant-input-affix-wrapper-lg]'   : 'isLargeAffix',
    '[class.ant-input-search-lg]'          : 'isLargeSearch',
    '[class.ant-input-group-sm]'           : 'isSmallGroup',
    '[class.ant-input-affix-wrapper-sm]'   : 'isSmallAffix',
    '[class.ant-input-group-wrapper-sm]'   : 'isSmallGroupWrapper'
  }
})
```

### ContentChildren

Configures a content query.

桥接指令的吧。

```ts
  // 引入指令，返回结果是QueryList类型的数据，复合NzInputDirective的返回结果，结果被赋值给变量listOfNzInputDirective
  @ContentChildren(NzInputDirective) listOfNzInputDirective: QueryList<NzInputDirective>;
```

### TemplateRef 表示一个内嵌模板，它可用于实例化内嵌的视图。内嵌视图。

[官方文档说明](https://angular.cn/api/core/TemplateRef)

通过把一个指令放在 `<ng-template>` 元素（或一个带 \* 前缀的指令）上，可以访问 TemplateRef 的实例。 内嵌视图的 TemplateRef 实例会以 TemplateRef 作为令牌，注入到该指令的构造函数中。

让一个组件直接引用另一个组件还是很有意义的。

每个组件都有**一个宿主视图**和**一些内嵌视图**。

### HostBinding

获取相关的属性值

```ts
  @HostBinding('style.color') color: string; // 获取style.color的类型
  @HostBinding('style.padding.px') padding: string; // 获取带单位的padding
```

## 生命周期

### AfterContentInit

- 一个生命周期钩子，它会在 Angular 完全实例化了指令的所有内容之后调用。 定义一个 ngAfterContentInit() 方法来处理**额外的初始化任务**。
- 一个回调方法，它会在 Angular **初始化完该指令的所有内容之后立即调用**。 在指令初始化完成之后，它只会调用一次。

## 输入组件

### setValue 与 patchValue

setValue 需要设置所有的值；
patchValue 设置改变的值；
