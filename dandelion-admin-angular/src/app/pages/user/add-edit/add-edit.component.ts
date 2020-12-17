import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserService } from "src/app/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { UploadFile, NzMessageService } from "ng-zorro-antd";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-user-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.styl"]
})
export class UserAddEditComponent implements OnInit {
  public userId;
  public user;
  public validateForm: FormGroup;
  public uploadAction: string;

  uploading = false;
  fileList: UploadFile[] = [];
  constructor(
    private routeInfo: ActivatedRoute,
    private userService: UserService,
    private fbFilter: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.validateForm = this.fbFilter.group({
      username: [null, [Validators.required]],
      phonenumber: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      gender: [null, [Validators.required]]
      // avatar: [null, [Validators.required]]
    });
    this.uploadAction = environment.api_url + "/upload/async/upload-file";
    // 获取参数值
    this.userId = ~~this.routeInfo.snapshot.params["id"];
    this.getUserDetailById();
  }

  getUserDetailById() {
    let userId = this.userId;
    if (!userId) {
      return;
    }
    this.userService.getUserDetailById({ userId }).subscribe(res => {
      this.user = res.data;
      this.setValue();
    });
  }
  setValue() {
    let user = this.user;
    this.validateForm.setValue({
      username: user.username,
      phonenumber: user.phonenumber,
      gender: user.gender,
      email: user.email
    });
  }
  // 提交按钮
  submitForm = ($event: any, value: any) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    let userId = this.userId;
    let params = { ...value };
    if (userId) {
      params = { id: userId, ...value };
    }
    this.userService.saveUser(params).subscribe(res => {
      debugger
    });
  };
  // 重置表单
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    if (this.user) {
      this.setValue();
    } else {
      this.validateForm.reset();
    }
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  // 图片上传相关
  // beforeUpload = (file: UploadFile): boolean => {
  //   this.fileList = this.fileList.concat(file);
  //   return false;
  // };
  // handleUpload(): void {
  //   const formData = new FormData();
  //   // tslint:disable-next-line:no-any
  //   this.fileList.forEach((file: any) => {
  //     formData.append("files", file);
  //   });
  //   this.uploading = true;
  //   debugger;
  //   this.userService.uploadFile(formData, this.uploadAction).subscribe(res => {
  //     this.uploading = false;
  //   });
  // // You can use any AJAX library you like
  // const req = new HttpRequest("POST", this.uploadAction, formData, {
  //   // reportProgress: true
  // });
  // this.http
  //   .request(req)
  //   .pipe(filter(e => e instanceof HttpResponse))
  //   .subscribe(
  //     () => {
  //       this.uploading = false;
  //       this.fileList = [];
  //       this.msg.success("upload successfully.");
  //     },
  //     () => {
  //       this.uploading = false;
  //       this.msg.error("upload failed.");
  //     }
  //   );
  // }
}
