import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  // 定义变量，这里可能需要后边通过接口拿到
  public userInfo: any;
  protected visible: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.userInfo = {
      username: '邱大爷',
      avatar: 'assets/images/avator.ico'
    }
  }
  logoutHandler() {
    console.log(this);
    this.router.navigate(['/user/login']);
  }

  protected popoverClick(): void {
    this.visible = !this.visible;
  }

  // 编辑资料
  protected userEdit(): void {
    this.visible = false;
    // 跳转页面
    this.router.navigate(['/pages/user/edit']);
  }
}
