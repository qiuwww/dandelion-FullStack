// ng g component pages/user/list --module pages/user
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core";
interface Pagination {
  total: number;
  pageIndex: number;
  pageSize: number;
}
@Component({
  selector: "app-user-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.styl"]
})
export class UserlistComponent implements OnInit {
  // 当前用户的列表
  public list: Array<any> = [];
  public message: string = "message";
  public pagination: Pagination = {
    total: 0,
    pageIndex: 1,
    pageSize: 5
  };
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    let self = this;
    let pagination = this.pagination;
    this.userService
      .getUserList({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      })
      .subscribe(res => {
        if (!res.code && res.data) {
          // 验证不通过就不会给提交
          self.list = res.data;
          self.pagination.total = res.total || 0;
        } else {
          alert(res.msg);
        }
      });
  }

  // aa-pagination 组件的回调函数
  pageIndexChange(currentPage: number) {
    console.log("pageIndexChange ", currentPage);
    this.pagination.pageIndex = currentPage;
    this.getUserList();
  }
  // 点击编辑的时候的回调函数
  deleteHandle(id) {
    this.userService.deleteUser({ id }).subscribe(res => {
      this.getUserList();
    });
  }
}
