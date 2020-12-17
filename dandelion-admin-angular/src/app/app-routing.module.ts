// ng generate module app-routing --flat --module = app
// --flat 把这个文件放进了 src / app 中，而不是单独的目录中。
// --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

// Angular 的最佳实践之一就是在一个独立的顶级模块中加载和配置路由器，它专注于路由功能，然后由根模块 AppModule 导入它。
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 重定向到默认的地址上
const routes: Routes = [
  {
    path: 'auth',
    // 这里路由到子路由模块，模块不需要导入
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  // 输入输出确认
  // 这个方法之所以叫 forRoot()，是因为你要在应用的顶级配置这个路由器。
  // forRoot() 方法会提供路由所需的服务提供商和指令，还会基于浏览器的当前 URL 执行首次导航。
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
