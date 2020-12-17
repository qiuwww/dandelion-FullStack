// ng g component components/input --modules components/input
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.styl']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
