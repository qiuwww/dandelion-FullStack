# 使用 ng-zorro 进行开发

## 添加组件库

`$ ng add ng-zorro-antd`

## 遇到的问题

### 设置 table 的 nzTotal 不管用

默认是前端分页，需要设置`[nzFrontPagination]="false"`使用后端分页。

### pagination 中遇到的问题

1. 设置自定义的 prev 与 next 的时候，title 还是会提示上一页，下一页；
2. 不能设置中间部分的显示块的个数；

### nzTable 的数据更新不刷新的情况

```html
#expandTable [nzData]="listOfData"

<tr *ngFor="let data of expandTable.data">
  <td>{{ data.title }}</td>

  <!-- 修改为 -->
</tr>

<tr *ngFor="let data of listOfData">
  <td>{{ data.title }}</td>
</tr>
```

这里的数据经过了一次处理之后，造成再次更改 listOfData，不会触发 table 更新。这里要直接遍历 listOfData。
