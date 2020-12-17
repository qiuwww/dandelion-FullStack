// 是因为它提供了启动和运行浏览器应用的那些基本的服务提供商。
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 设置路由hash模式
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

// 路由部分，添加AppRoutingModule，路由注册
import { AppRoutingModule } from './app-routing.module';
// 组件
import { AppComponent } from './app.component';

// components组件库导出组件的组件模块
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  // 通过 imports 和 exports 数组来把多个 NgModule 放在一起，并彼此可用。
  // 声明模块中应该有什么东西，只能声明组件、指令、管道
  // 编译器配置，用于告诉编译器指令的选择器并通过选择器匹配的方式决定要把该指令应用到模板中的什么位置。
  declarations: [
    AppComponent
  ],
  // 依赖的模块
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    // 导入组件构成的module
    // 这里导入如下的组件，就可以在当前模块下的路由中直接使用旗下的组件了
    ComponentsModule,
    PagesModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  // 声明模块中应该有什么东西，只能声明组件、指令、管道
  // 编译器配置，用于告诉编译器指令的选择器并通过选择器匹配的方式决定要把该指令应用到模板中的什么位置。
  // 通过 providers 数组提供给注入器的配置。
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
