// ng g c pages/douban/movies --module pages/douban

/**
 * 展示从豆瓣网站获取的电影列表，douban_chart_movies
 */
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { DoubanService } from "../../../core/services/douban.service";
@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.styl"]
})
export class MoviesComponent implements OnInit {
  validateForm: FormGroup;
  listOfData = [];
  pagination = {
    total: 0,
    pageSize: 10,
    pageIndex: 1
  };
  sort = {};
  types = [];
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.pagination.pageIndex = 1;
    this.getMovieList();
  }
  constructor(
    private fbFilter: FormBuilder,
    private doubanService: DoubanService
  ) {
    console.log(this);
  }

  ngOnInit() {
    this.validateForm = this.fbFilter.group({
      title: [null],
      type: [null]
    });
    // 初始化操作
    this.init();
  }
  getMovieList() {
    let params = {
      pagination: this.pagination,
      filter: this.validateForm.value,
      sort: this.sort
    };
    this.doubanService.getMovieList(params).subscribe(res => {
      if (res.errno) {
        this.listOfData = [];
        return;
      }
      this.listOfData = res.data;
      this.pagination.total = res.total;
    });
  }
  getTypes() {
    this.doubanService.getTypes().subscribe(res => {
      this.types = res.data;
    });
  }
  init() {
    this.getMovieList();
    this.getTypes();
  }

  // 页面的分页信息改变的时候的回调
  paginationChange(index, size): void {
    this.pagination.pageIndex = index || this.pagination.pageIndex;
    this.pagination.pageSize = size || this.pagination.pageSize;
    this.getMovieList();
  }

  // 表头排序操作，前端排序，这里没处理不排序的情况，后期添加暂存状态
  theadSortByFE(sortKey, sortValue): void {
    console.log(sortKey, sortValue);
    let listOfData = this.listOfData || [];
    let sortBy = property => {
      return (a, b) => {
        return "descend" === sortValue
          ? a[property] - b[property]
          : b[property] - a[property];
      };
    };
    this.listOfData = listOfData.sort(sortBy(sortKey));
  }
  // 后端排序
  theadSortByBE(sortKey, sortValue): void {
    console.log(sortKey, sortValue);
    this.sort = {
      sortKey,
      sortValue
    };
    this.getMovieList();
  }
  getType_name(type) {
    let types = this.types || [];
    let res = types.filter(item => {
      return item.type === type;
    });
    return res[0]["type_name"];
  }
}
