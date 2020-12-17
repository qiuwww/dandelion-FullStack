import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.styl"]
})
export class MenuComponent implements OnInit {
  public menuData: any[] = [];

  constructor() {}

  ngOnInit() {
    this.menuData = [
      {
        id: 1,
        name: "introduction",
        path: "introduction",
        icon: "fa-book",
        children: []
      },
      {
        id: 2,
        name: "userlist",
        path: "user/list",
        icon: "fa-users",
        children: []
      },
      {
        id: 3,
        name: "tables",
        path: "tables",
        icon: "fa-table",
        children: []
      },
      {
        id: 4,
        name: "charts",
        path: "charts",
        icon: "fa-pie-chart",
        children: []
      },
      {
        id: 5,
        checked: false,
        name: "douban",
        path: "douban",
        icon: "fa-film",
        children: [
          {
            id: 51,
            name: "chart-movies",
            path: "chart-movies"
          },
          {
            id: 52,
            name: "annual-movies",
            path: "annual-movies"
          },
          {
            id: 53,
            name: "ranking-movies",
            path: "ranking-movies"
          }
        ]
      }
    ];
    console.log("menuData: ", this.menuData);
  }

  // 切换显示与隐藏
  changeSubmenuChecked(e, item) {
    e.stopPropagation();
    let id = item.id;
    this.changeMenuData(id);
  }
  // 修改menuData
  changeMenuData(id) {
    let menuData = this.menuData || [];
    let newArr = menuData.map(item => {
      let newItem = item;
      if (item.id == id) {
        newItem.checked = !newItem.checked;
      } else {
        newItem.checked = false;
      }
      return newItem;
    });
    this.menuData = newArr;
    return;
  }
}
