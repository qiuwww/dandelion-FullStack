// 应用的主要入口点，使用JIT 编译器编译本应用，并启动应用的根模块 AppModule，使其运行在浏览器中。
// 你还可以使用AOT 编译器，而不用修改任何代码 —— 只要给 ng build 或 ng serve 传入--aot 参数就可以了。

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
