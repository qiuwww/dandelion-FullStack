import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2
} from '@angular/core';


// 定义TypeScript的类型
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type Align = 'top' | 'middle' | 'bottom';
export type Type = 'flex' | null;
export enum Breakpoint {
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs'
}
export type BreakpointMap = { [index in keyof typeof Breakpoint]: string };
// 定义字典，映射css属性
const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

// 用于在渲染的时候，添加class属性
import { UpdateHostClassService } from '../../update-host-class.service';
// 检测平台
import { Platform } from '@angular/cdk/platform';
// media
import { MediaMatcher } from '@angular/cdk/layout';
// 使用rxjs对结果进行处理
import { fromEvent, Subject } from 'rxjs';
// auditTime，延时，这里的作用是去抖动
// takeUntil，直到回调触发，否则就一直执行，也就是在回调触发的时候取消事件
import { auditTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'aa-row',
  templateUrl: './aa-row.component.html',
  styleUrls: ['../aa-grid.style.styl'],
  // 使用的服务还需要在组件内说明
  providers: [UpdateHostClassService]
})
export class AaRowComponent implements OnInit, AfterViewInit, OnDestroy {
  // 获取aa-row的输入props
  @Input() aaType: Type;
  @Input() aaAlign: Align = 'top';
  @Input() aaJustify: Justify = 'start';
  @Input() aaGutter: number | object;
  // 定义内部属性
  private _prefixCls = 'aa-row';
  // 当前的页面截断宽度
  private breakPoint: Breakpoint;
  // 拿到当前的元素节点
  private el: HTMLElement = this.elementRef.nativeElement;
  // 它即是Observable又是Observer
  destroy$ = new Subject();
  actualGutter: number;

  constructor(
    public updateHostClassService: UpdateHostClassService,
    public elementRef: ElementRef,
    public platform: Platform,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher
  ) {
    console.log("aa-row: ", this);
  }
  // 计算gutter，区分不同的类型来取值，object || number
  calculateGutter(): number {
    if (typeof this.aaGutter !== 'object') {
      return this.aaGutter;
    } else if (this.breakPoint && this.aaGutter[this.breakPoint]) {
      return this.aaGutter[this.breakPoint];
    } else {
      return;
    }
  }
  // 更新gutter的值
  updateGutter(): void {
    this.actualGutter = this.calculateGutter();
    // 修改页面
    this.renderer.setStyle(this.el, 'margin-left', `-${this.actualGutter / 2}px`);
    this.renderer.setStyle(this.el, 'margin-right', `-${this.actualGutter / 2}px`);
  }
  // watch media
  watchMedia(): void {
    // @ts-ignore
    Object.keys(responsiveMap).map((screen: Breakpoint) => {
      const matchBelow = this.mediaMatcher.matchMedia(responsiveMap[screen]).matches;
      if (matchBelow) {
        this.breakPoint = screen;
      }
    });
    this.updateGutter();
  }
  ngOnInit() {
    // 根据props来设置css
    this.setClassMap();
    // 根据media来调整页面
    this.watchMedia();
  }
  ngAfterViewInit(): void {
    // 这里给window，添加resize事件，在一定时间内只会触发一次，下一次的时间覆盖上一次的
    // 这里auditTime是去抖动的作用
    // 在destroy$触发（next）的时候，就不去执行回调函数
    // takeUntil，发出值，直到提供的 observable 发出值，它便完成。
    fromEvent(window, 'resize')
      .pipe(auditTime(1600), takeUntil(this.destroy$))
      .subscribe(() => {
        console.log("aa-row: resize emit");
      });
  }
  ngOnDestroy(): void {
    console.log("aa-row ngOnDestroy");
    // takeUntil的结果需要这里发出
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    const classMap = {
      [`${this._prefixCls}`]: !!this.aaType,
      [`${this._prefixCls}-${this.aaType}`]: this.aaType,
      [`${this._prefixCls}-${this.aaType}-${this.aaAlign}`]: this.aaType && this.aaAlign,
      [`${this._prefixCls}-${this.aaType}-${this.aaJustify}`]: this.aaType && this.aaJustify
    };
    this.updateHostClassService.updateHostClass(this.el, classMap);
  }
}
