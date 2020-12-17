import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AaIconDirective } from './aa-icon.directive';

@NgModule({
  declarations: [AaIconDirective],
  imports: [
    CommonModule
  ],
  exports: [AaIconDirective]
})
export class AaIconModule { }

// 目标，添加type，对应于http://www.fontawesome.com.cn/faicons/的图标
// 目前实现了类型的设置与大小的设置
