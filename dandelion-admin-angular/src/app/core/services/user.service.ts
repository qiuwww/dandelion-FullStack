// 应该是用户管理模块
// 服务也不尽是数据请求，也包括本地的数据的处理，相当于controller了吧
import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
// 响应式编程是一种面向数据流和变更传播的异步编程范式
// RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单(RxJS Docs) 。
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { User } from "../models";

// distinctUntilChanged 阻止 Observable 发出相同的元素，如果后一个元素和前一个元素是相同的，那么这个元素将不会被发出来。如果后一个元素和前一个元素不相同，那么这个元素才会被发出来。
import { map, distinctUntilChanged } from "rxjs/operators";
import { filter } from "rxjs/operators";
// 声明某个类具有一些依赖。当依赖注入器要创建这个类的实例时，应该把这些依赖注入到它的构造函数中。
@Injectable() // 注入的内容，这里是空置的
export class UserService {
  // 当前的user的事件订阅对象
  // 当观察者对 BehaviorSubject 进行订阅时，它会将源 Observable 中  最新  的元素发送出来（如果不存在最新的元素，就发出默认元素）。
  // 然后将随后产生的元素发送出来。
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  // 推荐管道操作，获取当前的对象？
  // 可以通过调用 asObservable() 方法转换成序列。然后你可以对这个序列应用操作符，来合成其他的序列。
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  // 同上， 将对观察者发送全部的元素，无论观察者是何时进行订阅的。
  // ReplaySubject ReplaySubject 将对观察者发送全部的元素，无论观察者是何时进行订阅的。
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // 只是这个类的一个私有变量
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    // 变量类型 变量名称 变量类型
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  // 首页的初始化，填充的意思
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService
        .get("/user")
        // 订阅回掉
        .subscribe(data => this.setAuth(data.user), err => this.purgeAuth());
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    // 填进可观察队列
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
  // 登录与注册接口
  attemptAuth(type, credentials): Observable<User> {
    const route = type === "login" ? "/login" : "";
    return this.apiService.post("/users" + route, { user: credentials }).pipe(
      map(data => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put("/user", { user }).pipe(
      map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
  // 获取用户列表
  getUserList(params): Observable<any> {
    return this.apiService.post("/user/list", params).pipe(
      map(data => {
        return data;
      })
    );
  }
  // 删除用户
  deleteUser(params): Observable<any> {
    return this.apiService.post("/user/delete", params).pipe(
      map(data => {
        return data;
      })
    );
  }
  // 获取单个用户的详细信息
  getUserDetailById(params): Observable<any> {
    return this.apiService.post("/user/detail/" + params.userId, {}).pipe(
      map(data => {
        return data;
      })
    );
  }
  // uploadFile(formData, url): Observable<any> {
  //   const req = new HttpRequest("POST", url, formData, {
  //     // reportProgress: true
  //     headers: {
  //       // "Content-Type": "multipart/form-data;"
  //     }
  //   });
  //   return this.http.request(req).pipe(filter(e => e instanceof HttpResponse));
  // }

  // 新建或者更新
  saveUser(params): Observable<any> {
    return this.apiService.post("/user/save", params).pipe(
      map(data => {
        return data;
      })
    );
  }
}
