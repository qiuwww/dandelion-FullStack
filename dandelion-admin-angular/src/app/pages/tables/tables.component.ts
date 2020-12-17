import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.styl']
})
export class TablesComponent implements OnInit {

  public dataSet: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: Math.floor(Math.random() * 80) + 10,
        address: `London, Park Lane no. ${i}`,
        checked: Boolean(i%2)
      });
    }
  }
  getTableState() {
    console.log("tableState: ", this.dataSet);
  }
  getTableData() {

  }
}
