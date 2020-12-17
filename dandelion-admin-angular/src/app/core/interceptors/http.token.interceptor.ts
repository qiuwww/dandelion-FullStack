import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { JwtService } from '../services';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
// 拦截器，在这里进行发送请求之前的一些操作
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, public router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // 设置headers
    const headersConfig = {
      // 设置请求的数据格式，设置为json形式的，后端接收到的是对象（经过bodyParse处理过的），data可以stringify，也可以不进行转换
      // 如果不设置，这里的默认值是text/plain，后端接受到的是一个json字符串。
      // 切记这里最后没有分号
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
      // Bearer：Beare作为一种认证类型(基于OAuth 2.0)，使用"Bearer"关键词进行定义，必须是Bearer头信息
      headersConfig['Authorization'] = `Bearer ${token}`;
      // 当然这里也可以使用自定义的token头，需要设置后端接受这个参数
    }
    const request = req.clone({ setHeaders: headersConfig });
    // 在 HttpInterceptor 中，HttpHandler 参数就表示链中的下一个拦截器。
    // mergeMap 允许同一时间存在多个活动的内部订阅
    return next.handle(request).pipe(mergeMap((event: any) => {
      // 对结果的预处理
      const errCode = event.body && event.body.code;
      if (errCode) {
        switch (errCode) {
          case -1:
            // 在提示框中展示错误消息
            this.router.navigate(['/user/login']);
            // 立即完成的 observable 。
            return empty();
          default:
            break;
        }
      }
      if (event instanceof HttpResponse && event.status != 200) {
        return throwError(event);
      }
      return Observable.create(observer => observer.next(event)); // 请求成功返回响应
    }))
  }
}
