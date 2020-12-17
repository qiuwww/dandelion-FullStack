import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  AuthService,
  // 数据请求服务
  // ArticlesService,
  // AuthGuard,
  // CommentsService,
  JwtService,
  // ProfilesService,
  // TagsService,
  UserService,
  DoubanService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    // 其下的服务需要使用HttpClient，在这里需要引用HttpClientModule
    HttpClientModule
  ],
  // 在这里列出了提供商的依赖项可用于注入到任何组件、指令、管道或该注入器下的服务。引导用的 NgModule 使用的是根注入器，可以为应用中的任何部件提供依赖。
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    ApiService,
    AuthService,
    // ArticlesService,
    // AuthGuard,
    // CommentsService,
    JwtService,
    // ProfilesService,
    // TagsService,
    UserService,
    DoubanService
  ],
  declarations: [],
  exports: []
})
export class CoreModule {}
