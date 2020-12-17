import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
// 响应式表单
// FormBuilder 提供了一个语法糖，以简化 FormControl、FormGroup 或 FormArray 实例的创建过程。 它会减少构建复杂表单时所需的样板代码的数量。
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// 调用当前组件的服务
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core';
// 组件不应该直接获取或保存数据，它们不应该了解是否在展示假数据。
// 它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务。

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {
  // // 判断当前页面的地址，决定是渲染login还是register
  public isLogin: boolean = false;
  // 控制是否显示密码输入
  public passwordType: string = 'password';
  // 定义数据对象，用于双向数据绑定
  public authForm: FormGroup;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: AuthService,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      // 对应formControlName
      // ['初始值', '验证规则']
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("userService: ", this.userService);
    // 获取当前页面的路径信息，然后进行路径判断渲染页面的不同
    // 这里需要订阅参数变化，不能直接获取，使用rxjs呢？
    this.route.params.subscribe(data => {
      this.isLogin = data.authType === 'login';
      if (!this.isLogin) {
        this.authForm.addControl('phonenumber', new FormControl('', {
          validators: Validators.required
        }));
      } else {
        this.authForm.contains('phonenumber') && this.authForm.removeControl('phonenumber');
      }
    });
  }
  // 提交表单
  submitForm() {
    let self = this;
    let isLogin = this.isLogin;
    let body: User = this.authForm.value;
    this.userService.attemptAuth(isLogin, body)
      .subscribe(res => {
        if (!res.code && res.data) {
          // 验证不通过就不会给提交
          setTimeout(() => {
            self.router.navigate(['/pages/introduction']);
          }, 1000);
        } else {
          alert(res.msg);
        }
      });
  }
  changePasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
