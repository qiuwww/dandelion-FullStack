import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { RouterModule, Routes } from '@angular/router';

const chartsRoutes: Routes = [
  // 注册与登录 login || register
  {
    path: 'chart1',
    component: ChartsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(chartsRoutes)
  ]
})
export class ChartsRoutingModule { }
