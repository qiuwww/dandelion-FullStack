import {
  Component,
  OnInit,
  HostBinding,
  // 可选依赖
  ElementRef,
  Optional,
  Host,
  Input
} from '@angular/core';

// 获取组件aa-row的类
import { AaRowComponent } from '../aa-row/aa-row.component';
import { AaRowDirective } from '../aa-row/aa-row.directive';
import { isNotNil } from '../../../core/util/check';
import { UpdateHostClassService } from '../../update-host-class.service';

@Component({
  selector: 'aa-col',
  templateUrl: './aa-col.component.html',
  styleUrls: ['../aa-grid.style.styl'],
  providers: [UpdateHostClassService],
})
export class AaColComponent implements OnInit {
  // 取得外套元素aa-row的gutter，这里直接就添加了属性给template了，也就是设置style一样的操作
  private _prefixCls = 'aa-col';

  private el: HTMLElement = this.elementRef.nativeElement;

  @Input() aaSpan: number;

  @Input() ndOrder: number;
  @Input() ndOffset: number;

  @Input() ndPush: number;
  @Input() ndPull: number;

  @HostBinding('style.padding-left.px')
  get paddingLeft(): number {
    return this.aaRow && this.aaRow.actualGutter / 2;
  }
  @HostBinding('style.padding-right.px')
  get paddingRight(): number {
    return this.aaRow && this.aaRow.actualGutter / 2;
  }
  constructor(
    // 可选组件，直到找到托管组件(父组件)为止
    @Optional()
    @Host()
    public aaRowComponent: AaRowComponent,
    @Optional()
    @Host()
    public aaRowDirective: AaRowDirective,
    private ndUpdateHostClassService: UpdateHostClassService,
    private elementRef: ElementRef,

  ) {
    console.log("aa-col: ", this);
  }

  ngOnInit() {
    this.setClassMap();
  }
  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    const classMap = {
      [`${this._prefixCls}-${this.aaSpan}`]: isNotNil(this.aaSpan),
      [`${this._prefixCls}-order-${this.ndOrder}`]: isNotNil(this.ndOrder),
      [`${this._prefixCls}-offset-${this.ndOffset}`]: isNotNil(this.ndOffset),
      [`${this._prefixCls}-pull-${this.ndPush}`]: isNotNil(this.ndPush),
      [`${this._prefixCls}-push-${this.ndPull}`]: isNotNil(this.ndPull),
      // ...this.generateClass()
    };
    this.ndUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  // 这里的aaRowDirective继承于组件
  // export class AaRowDirective extends AaRowComponent
  get aaRow(): AaRowComponent {
    return this.aaRowComponent || this.aaRowDirective;
  }

}
