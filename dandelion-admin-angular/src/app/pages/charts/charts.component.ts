import { Component, OnInit } from "@angular/core";
// 添加第三方库的时候，需要提前声明。
declare var Chart: any;

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.styl"]
})
export class ChartsComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.initChart();
  }

  initChart(): void {
    // https://www.chartjs.org/docs/latest/getting-started/
    // http://chartjs.cn/docs/
    var myChart: any = document.getElementById("myChart");
    var ctx = myChart.getContext("2d");
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",
      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },
      // Configuration options go here
      options: {}
    });
  }
}
