// ng g directive components / aa - grid / aa - row / aa - row--module components/aa-grid
import {
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';

import { AaRowComponent } from './aa-row.component';
// 用于在渲染的时候，添加class属性
import { UpdateHostClassService } from '../../update-host-class.service';
// 检测平台
import { Platform } from '@angular/cdk/platform';
// media
import { MediaMatcher } from '@angular/cdk/layout';

@Directive({
  selector: '[aa-row]',
  providers: [UpdateHostClassService]
})
// 这里的继承实现还是挺麻烦的啊
export class AaRowDirective extends AaRowComponent {
  // 这里的参数要对应
  constructor(
    public updateHostClassService: UpdateHostClassService,
    public elementRef: ElementRef,
    public platform: Platform,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher
  ) {
    super(updateHostClassService, elementRef, platform, renderer, mediaMatcher);
  }

}
