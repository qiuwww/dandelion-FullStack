import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
//引入表单相关的模块 才可以用双休数据绑定
import { FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { TablesComponent } from "./tables/tables.component";
import { ChartsComponent } from "./charts/charts.component";
import { UserModule } from "./user/user.module";
import { LayoutsModule } from "./layouts/layouts.module";
import { CoreModule } from "../core/core.module";
import { IntroductionModule } from "./introduction/introduction.module";
import { DoubanModule } from "./douban/douban.module";

// 这里的页面是没有modules的
const usedComponent = [TablesComponent, ChartsComponent];

@NgModule({
  declarations: [...usedComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    PagesRoutingModule,
    UserModule,
    LayoutsModule,
    CoreModule,
    IntroductionModule,
    DoubanModule
  ]
})
export class PagesModule {}
