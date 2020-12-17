// ng g component components/popover --module components/components
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.styl']
})
export class PopoverComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  // 接受props
  @Input() visible: boolean;

  constructor() { }

  ngOnInit() {
  }



}
