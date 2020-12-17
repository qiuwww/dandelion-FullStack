import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LayoutWithMenuComponent } from "./layout-with-menu/layout-with-menu.component";
import { MenuComponent } from "./menu/menu.component";
// 这里要使用到app-header等组件，所以需要引入该组件所在的模块
import { ComponentsModule } from "../../components/components.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];
const COMPONENTS = [
  LayoutWithMenuComponent,
  MenuComponent,
  FooterComponent,
  HeaderComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...BASE_MODULES, ComponentsModule],
  exports: [...BASE_MODULES, ...COMPONENTS]
})
export class LayoutsModule {}
