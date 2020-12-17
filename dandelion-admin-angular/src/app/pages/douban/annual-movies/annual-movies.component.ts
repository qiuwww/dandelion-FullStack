// ng g c pages/douban/annual-movies --module pages/douban
import { Component, OnInit } from "@angular/core";
import { DoubanService } from "../../../core";
import { NzMessageService } from "ng-zorro-antd";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-annual-movies",
  templateUrl: "./annual-movies.component.html",
  styleUrls: ["./annual-movies.component.styl"]
})
export class AnnualMoviesComponent implements OnInit {
  yearData = [];
  widgetData: { [year: string]: string[] } = {};
  widgetDictionary: { [id: number]: object } = {};
  validateForm: FormGroup;
  // 要展示的内容类型和具体的信息
  public showMovie;
  constructor(
    private fbFilter: FormBuilder,
    private doubanService: DoubanService,
    private message: NzMessageService
  ) {
    console.log("AnnualMoviesComponent: ", this);
  }

  ngOnInit() {
    this.getYear();
    this.getWidget();
    this.validateForm = this.fbFilter.group({
      year: [null],
      widget: [null]
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.getDetail();
  }
  yearChange(value: string): void {
    this.validateForm.get("widget").reset();
  }

  getYear(): void {
    this.doubanService.getYear().subscribe(res => {
      if (res.errno || !res.data) {
        this.yearData = [];
        this.widgetData = {};
        return;
      }
      let yearData = [],
        widgetData = {};
      res.data.forEach(item => {
        yearData.push(item.sub_title);
        widgetData[item.sub_title] = JSON.parse(item.widget_infos_ids);
      });
      this.yearData = yearData;
      this.widgetData = widgetData;
      // 初始化选中
    });
  }
  // 获取类目的列表
  getWidget(): void {
    this.doubanService.getWidget().subscribe(res => {
      if (res.data && !res.errno) {
        let widgetDictionary = {};
        res.data.forEach(item => {
          widgetDictionary[item.id] = {
            ...item,
            title: item.title || item.kind_cn
          };
        });
        this.widgetDictionary = widgetDictionary;
      } else {
        this.message.error(res.msg);
      }
    });
  }
  getDetail(): void {
    let widgetId = this.validateForm.value["widget"];
    let detail = this.widgetDictionary[widgetId];
    if (!detail) {
      this.showMovie = "";
      return;
    }
    // 这个位置的字符串直接分割会有问题，有的时候是", "分割，有的时候是","分割
    let subject_ids = detail["subject_ids"] || "";
    if (subject_ids.length) {
      subject_ids = JSON.parse("[" + subject_ids + "]");
    } else {
      subject_ids = [];
    }
    // 保存需要请求的movie的id
    let ids_needReq = [];
    // 如果movie没有这个结果，并且类型是top开头的字段
    if (/^top/gi.test(detail["kind_str"]) && subject_ids.length) {
      // 遍历数组，首先判断是否已经缓存到本地，没有的话就去请求数据
      subject_ids.forEach(item => {
        ids_needReq.push(~~item);
      });
    } else {
      this.showMovie = detail["description"];
      return;
    }
    // 合并请求数据
    this.doubanService
      .getAnnualMovies({
        ids: ids_needReq
      })
      .subscribe(res => {
        console.log("getAnnualMovies: ", res);
        if (!res.errno) {
          this.showMovie = res.data;
        } else {
          this.message.error(res.msg);
        }
      });
  }
  showMovieList(): boolean {
    return Array.isArray(this.showMovie);
  }
}
