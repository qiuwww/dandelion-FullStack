//  ng g c pages/douban/ranking-movies --module pages/douban
// 使用百度地图来分析排行
// 取数据表豆瓣douban_chart_*
import { Component, OnInit } from "@angular/core";
declare let echarts: any;
import { DoubanService } from "../../../core/services/douban.service";
@Component({
  selector: "app-ranking-movies",
  templateUrl: "./ranking-movies.component.html",
  styleUrls: ["./ranking-movies.component.styl"]
})
export class RankingMoviesComponent implements OnInit {
  public typesChart;
  public typesList = [];
  movieList = [];
  typesNumberMap = {};
  listOfData = [];
  tableTitle = "";
  constructor(private doubanService: DoubanService) {}
  ngOnInit() {
    this.typesChart = echarts.init(document.getElementById("types"));
    this.getChartTypes();
    this.getChartMovies();
    this.addEvent();
  }

  // 查询douban_chart_types
  getChartTypes() {
    this.doubanService.getTypes().subscribe(res => {
      if (res.errno) {
        this.typesList = [];
        return;
      }
      this.typesList = res.data;
      this.renderTypesChart();
    });
  }

  getChartMovies() {
    this.doubanService.getChartMovies().subscribe(res => {
      this.movieList = res.data || [];
      let typesNumberMap = {};
      let key, ids;
      res.data.forEach(item => {
        key = item.type;
        ids = typesNumberMap[key] || [];
        ids.push(item.id);
        typesNumberMap[key] = ids;
      });
      this.typesNumberMap = typesNumberMap;
      this.renderTypesChart();
    });
  }
  renderTypesChart() {
    // 基于准备好的dom，初始化echarts实例
    // 指定图表的配置项和数据
    const myChart = this.typesChart;
    const typesList = this.typesList;
    const typesNumberMap = this.typesNumberMap;
    if (!typesList.length || !Object.keys(this.typesNumberMap).length) {
      return;
    }
    let type_name_list = [],
      nums_list = [];
    console.log("typesList: ", typesList);
    console.log("typesNumberMap: ", typesNumberMap);
    typesList.forEach(item => {
      type_name_list.push(item.type_name);
      nums_list.push(typesNumberMap[item.type].length);
    });
    var option = {
      title: {
        text: "豆瓣电影类型"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: type_name_list
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "10%",
        top: "15%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: type_name_list,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "影片数量",
          type: "bar",
          data: nums_list,
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: "top", // 在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 14
                }
              }
            }
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.resize();
  }

  addEvent() {
    let self = this;
    //  选中图形的时候的回调
    this.typesChart.on("click", function(param) {
      let dataIndex = param.dataIndex;
      let movieList = self.movieList;
      let ids = self.typesNumberMap[dataIndex];
      self.listOfData = movieList.filter(item => ids.includes(item.id));
      self.tableTitle =
        param.name + "类的电影，影片数量总共" + param.value + "条";
    });
  }
}
