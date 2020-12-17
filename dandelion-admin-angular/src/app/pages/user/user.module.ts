// ng g module pages/user
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAddEditComponent } from "./add-edit/add-edit.component";
import { UserlistComponent } from "./list/list.component";
import { ComponentsModule } from "../../components/components.module";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [UserAddEditComponent, UserlistComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers: [],
  exports: []
})
export class UserModule {}
