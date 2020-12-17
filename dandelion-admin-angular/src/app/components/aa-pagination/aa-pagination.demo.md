# 使用示例

``` html
<aa-pagination [aaTotal]="530" [aaPageSize]="12" [aaPageIndex]="2" [aaShowTotal]="rangeTemplate" [aaShowQuickJumper]="true"
  (aaPageIndexChange)="pageIndexChange($event)"></aa-pagination>
<!-- 这里定义总页码，这个template的内部参数range和total -->
<ng-template #rangeTemplate let-range="range" let-total>
  {{range[0]}}-{{range[1]}} of {{total}} items
</ng-template>
```

<!-- 这里在使用的组件中，需要添加页面更改的回调函数 -->

``` js
  // aa-pagination 组件的回调函数
  pageIndexChange(currentPage: number) {
    console.log("pageIndexChange ", currentPage);
  }
```
