// 创建指令 ng generate module pages/auth/auth-routing --module pages/auth/auth --flat
// https://angular.cn/guide/router#refactor-the-routing-configuration-into-a-emrouting-moduleem
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
  // 注册与登录 login || register
  {
    path: ':authType',
    component: AuthComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
