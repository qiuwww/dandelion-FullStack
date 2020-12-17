import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models';
// 响应式编程是一种面向数据流和变更传播的异步编程范式
// RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单(RxJS Docs) 。
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  // 当前的user的事件订阅对象
  // 当观察者对 BehaviorSubject 进行订阅时，它会将源 Observable 中  最新  的元素发送出来（如果不存在最新的元素，就发出默认元素）。
  // 然后将随后产生的元素发送出来。
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  // 推荐管道操作，获取当前的对象？
  // 可以通过调用 asObservable() 方法转换成序列。然后你可以对这个序列应用操作符，来合成其他的序列。
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  // 同上， 将对观察者发送全部的元素，无论观察者是何时进行订阅的。
  // ReplaySubject ReplaySubject 将对观察者发送全部的元素，无论观察者是何时进行订阅的。
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // 只是这个类的一个私有变量
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    // 填进可观察队列，传入一个user，就可以对user进行后续的操作了
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  // 注册及登录
  attemptAuth(isLogin: boolean, user: User): Observable<any> {
    const route = isLogin ? 'login' : 'register';
    return this.apiService.post('/auth/' + route, user)
      .pipe(map(
        res => {
          this.setAuth(res.data);
          return res;
        }
      ));
  }
}
