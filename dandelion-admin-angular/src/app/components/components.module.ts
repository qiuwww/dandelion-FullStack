// 这里把所有的组件作为一个整体的模块导出，在app.module中导入后(也可以不导入)
// 在 需要使用的组件 所在的module中也导入，就可以使用其中的组件了

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// 内部有使用到routerLink的标签，所以要引入RouterModule模块
import { RouterModule } from "@angular/router";

import { MessageComponent } from "./message/message.component";
import { ModalComponent } from "./modal/modal.component";
import { LoadingComponent } from "./loading/loading.component";
import { PopoverComponent } from "./popover/popover.component";
import { AaButtonModule } from "./aa-button/aa-button.module";
import { AaIconModule } from "./aa-icon/aa-icon.module";
import { AaPaginationModule } from "./aa-pagination/aa-pagination.module";
import { AaGridModule } from "./aa-grid/aa-grid.module";

// 这里知识导出组件，服务，模块之类的另说
const COMPONENTS = [
  // 实用组件
  LoadingComponent,
  MessageComponent,
  ModalComponent,
  PopoverComponent
];
const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  AaButtonModule,
  AaIconModule,
  AaPaginationModule,
  AaGridModule
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class ComponentsModule {}
