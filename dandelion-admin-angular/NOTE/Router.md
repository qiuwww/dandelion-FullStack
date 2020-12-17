# Router

## Angualr routerLink 两种传参方法及参数的使用

### 查询参数的方式

路径：`http://localhost:8080/#/product?id=1`

标签跳转：<a [routerLink]="['/product']" [queryParams]="{id:1}">详情</a>

获取与 js 跳转

```js
constructor(private routeInfo:ActivatedRoute, private router: Router) {}

ngOnInit() {
  //获取参数值
  this.productId = this.routeInfo.snapshot.queryParams['id'];
}

//跳转其他产品页
goPage(){
   this.router.navigate(['/product'],{ queryParams: { id: 2 }});
}
```

### 使用路径参数来跳转

路径：`http://localhost:8080/#/product/1`

标签跳转：<a [routerLink]="['/product',1]">产品</a>

获取与 js 跳转：

```js
constructor(private routeInfo:ActivatedRoute, private router: Router) {}
ngOnInit() {
  //获取参数值
  this.productId = this.routeInfo.snapshot.params['id'];
  //另一种方式参数订阅
  this.routeInfo.params.subscribe((params: Params) => this.productId = params['id']);
}
//跳转其他产品页
goPage(){
   this.router.navigate(['/product/2']);
}
// 需要配合路由配置
const routes: Routes =[
  {path: 'product/:id',component: ProductComponent}
]
```
