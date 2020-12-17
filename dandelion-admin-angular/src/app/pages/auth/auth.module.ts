import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 引入自己的component
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { AuthComponent } from './auth.component';

@NgModule({
  // 当前module下的组件与服务与路由模块需要正常使用需要的模块
  imports: [
    ComponentsModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  // 如下属于导出的
  // 属于该模块的一组组件、指令和管道
  // 组件
  declarations: [
    AuthComponent
  ],
  // 服务
  providers: [
  ],
  exports: [
  ]
})
export class AuthModule {}
