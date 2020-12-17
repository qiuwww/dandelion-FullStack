// ng g s core/services/douban

import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { map } from "rxjs/operators";
import { of, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DoubanService {
  constructor(private apiService: ApiService) {}
  getMovieList(params) {
    return this.apiService.post("/douban/chart/movies", params).pipe(
      map(data => {
        return data;
      })
    );
  }

  getTypes() {
    return this.apiService.get("/douban/chart/types").pipe(
      map(data => {
        return data;
      })
    );
  }

  // douban_annual相关接口
  // 这里直接执行sql来查询
  getYear() {
    return this.apiService
      .post("/douban/query", { sql: "SELECT * From `douban_annual_years`" })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  getWidget() {
    return this.apiService
      .post("/douban/query", {
        sql: "SELECT * From `douban_annual_widget_infos`"
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  getAnnualMovies({ ids }) {
    // SELECT * FROM `douban_annual_movies` WHERE id in (1291560, 1291575, 1291853) order by id limit 2,4;
    const idstr = ids.join(",");
    // 如果不存在就发出一个空对象
    // if (!idstr.length) {
    //   return of({ errno: 0, msg: "数据都已经存在，不需要再次请求", data: [] });
    // }
    return this.apiService
      .post("/douban/query", {
        sql:
          "SELECT * From `douban_annual_movies` WHERE id in (" +
          idstr +
          ")" +
          " order by id"
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  // 获取所有的movie
  getChartMovies() {
    return this.apiService
      .post("/douban/query", {
        sql: "SELECT * From `douban_chart_movies` order by id"
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
