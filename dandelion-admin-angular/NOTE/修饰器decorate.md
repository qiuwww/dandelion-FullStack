# Angular 的修饰器 decorate

## @Optional

[参考文章](https://www.atjiang.com/angular-docs-dependency-injection/)
可选依赖

## @Host

用 @Host 限制注入器的查找到**托管组件**为止

托管组件通常就是请求依赖的组件，但是当组件被投入到另一个组件时，父组件就是托管组件。

## @Input()接受 props

- 如果是需要修改的，或者有副作用的参数，就需要拆开为 get 和 set 来操作这个 props

```ts
@Input()
  set aaTotal(value: number) {
    this._total = value;
    this.buildIndexes();
  }
  get aaTotal(): number {
    return this._total;
  }
```

- 如果只是接受参数，直接赋值就好；

```ts
@Input() nzSpan: number;
```
