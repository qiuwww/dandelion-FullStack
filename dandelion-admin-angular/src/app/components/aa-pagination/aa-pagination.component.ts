// ng g component components/aa-pagination --module components/aa-pagination
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
// Subject 有着双重特性，它同时拥有 Observer 和 Observable 的行为。
// https://rxjs-cn.github.io/RxJS-Ultimate-CN/content/subject.html
import { Subject } from 'rxjs';
import { toBoolean } from '../../core/util/convert';
import { isInteger } from '../../core/util/check';
import { NzI18nService } from '../../core/i18n/nz-i18n.service';
import { takeUntil } from 'rxjs/operators';

interface aaItemRenderInterface {
  $implicit: 'page' | 'prev' | 'next';
  page?: number;
}
@Component({
  selector: 'aa-pagination',
  templateUrl: './aa-pagination.component.html',
  styleUrls: ['./aa-pagination.component.styl']
})
export class AaPaginationComponent implements OnInit {
  // 生成一个
  private unsubscribe$ = new Subject<void>();
  // 中间变量，控制当前的页码选择
  locale: any = {};
  // 取得默认的模版 renderItemTemplate
  @ViewChild('renderItemTemplate') private _itemRender: TemplateRef<aaItemRenderInterface>;
  // 总数
  private _total: number;
  // pageSize
  private _pageSize: number;
  // 当前页码的索引
  private _pageIndex = 1;
  private _showQuickJumper = false;
  private _showSizeChanger = false;

  // 首页
  minIndex = 1;

  // 当前渲染的页码的对象数组
  pages = [];

  // 定义被观察对象
  @Output() readonly aaPageIndexChange: EventEmitter<number> = new EventEmitter();

  @Input()
  set aaTotal(value: number) {
    this._total = value;
    this.buildIndexes();
  }

  get aaTotal(): number {
    return this._total;
  }


  @Input()
  set aaPageIndex(value: number) {
    if (this._pageIndex === value) {
      return;
    }
    // 判断设置的当前页码是不是在范围内
    if (value > this.maxIndex) {
      this._pageIndex = this.maxIndex;
    } else if (value < this.minIndex) {
      this._pageIndex = this.minIndex;
    } else {
      this._pageIndex = Number(value);
    }
    this.buildIndexes();
  }
  get aaPageIndex(): number {
    return this._pageIndex;
  }

  @Input()
  set aaPageSize(value: number) {
    if (value === this._pageSize) {
      return;
    }
    this._pageSize = value;
    // 也就是说如果有意外超出的情况，就去更改设置的 aaPageIndex
    // 按道理这里就不会超出
    if (this.aaPageIndex > this.maxIndex) {
      this.aaPageIndex = this.maxIndex;
      // 当前页码改变之后触发事件，传递参数maxIndex
      this.aaPageIndexChange.emit(this.aaPageIndex);
    }
    this.aaPageIndexChange.emit(this.aaPageIndex);
    this.buildIndexes();
  }
  get aaPageSize(): number {
    return this._pageSize;
  }
  @Input()
  // 用于自定义页码的结构，如果有自定义的上一页与下一页就用自定义的，没有就用当前的默认的
  set aaItemRender(value: TemplateRef<aaItemRenderInterface>) {
    this._itemRender = value;
  }
  get aaItemRender(): TemplateRef<aaItemRenderInterface> {
    return this._itemRender;
  }
  // 控制是否显示 quickJumper
  @Input()
  set aaShowQuickJumper(value: boolean) {
    this._showQuickJumper = toBoolean(value);
  }
  get aaShowQuickJumper(): boolean {
    return this._showQuickJumper;
  }
  // 控制显示size选择框
  @Input()
  set aaShowSizeChanger(value: boolean) {
    this._showSizeChanger = toBoolean(value);
  }
  get aaShowSizeChanger(): boolean {
    return this._showSizeChanger;
  }
  // 也就是说总数只接受外部的，没有默认的。
  // 这里接受TemplateRef的传入参数
  @Input() aaShowTotal: TemplateRef<{ $implicit: number, range: [number, number] }>;

  constructor(private i18n: NzI18nService) {
    console.log("constructor: ", this);
  }
  // 延伸属性，根据总数和每页条数来
  get maxIndex(): number {
    return Math.ceil(this.aaTotal / this.aaPageSize);
  }
  /** generate indexes list */
  // 最终改变pages，然后驱动页面变动
  buildIndexes(): void {
    console.log("buildIndexes");
    const tmpPages = [];

    // 如果页码总数小于9，就顺序都显示
    if (this.maxIndex <= 9) {
      for (let i = 2; i <= this.maxIndex - 1; i++) {
        tmpPages.push({ index: i });
      }
    } else { // > 9
      // 否则就显示五个连续的，并且显示首尾
      const current = +this.aaPageIndex;
      // 区分左右显示什么
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.maxIndex - 1);

      if (current - 1 <= 2) {
        right = 5;
      }

      if (this.maxIndex - current <= 2) {
        left = this.maxIndex - 4;
      }
      // 只渲染中间五个，如果靠到左右，就只显示4个
      for (let i = left; i <= right; i++) {
        tmpPages.push({ index: i });
      }
    }
    this.pages = tmpPages;
  }
  // 跳转页码事件
  jumpPage(index: number): void {
    if (index === this.aaPageIndex) {
      return;
    }
    // 修改当前页码
    if (index < this.minIndex) {
      this.aaPageIndex = this.minIndex;
    } else if (index > this.maxIndex) {
      this.aaPageIndex = this.maxIndex;
    } else {
      this.aaPageIndex = index;
    }
    // 通知当前页码的订阅者
    this.aaPageIndexChange.emit(this.aaPageIndex);
  }
  // 跳转到前一页
  jumpPreOne(): void {
    if (this.isFirstIndex) {
      return;
    }
    this.jumpPage(this.aaPageIndex - 1);
  }
  // 跳转到后一页
  jumpNextOne(): void {
    if (this.isLastIndex) {
      return;
    }
    // 跳转到当前页面的前一个
    this.jumpPage(this.aaPageIndex + 1);
  }
  // 跳转到前五页
  jumpPreFive(): void {
    this.jumpPage(this.aaPageIndex - 5);
  }

  // 目标对象事件KeyboardEvent，标签HTMLInputElement
  handleKeyDown(e: KeyboardEvent, input: HTMLInputElement, clearInputValue: boolean): void {
    const target = input;
    const inputValue = target.value;
    const currentInputValue = this.aaPageIndex;
    let value;

    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else {
      value = Number(inputValue);
    }
    this.handleChange(value, target, clearInputValue);
  }
  // 输入的页码是否可用
  isValid(page: number): boolean {
    return isInteger(page) && (page >= 1) && (page !== this.aaPageIndex) && (page <= this.maxIndex);
  }
  // 处理页面改变
  handleChange(value: number, target: HTMLInputElement, clearInputValue: boolean): void {
    const page = value;
    if (this.isValid(page)) {
      this.aaPageIndex = page;
      this.aaPageIndexChange.emit(this.aaPageIndex);
    }
    if (clearInputValue) {
      target.value = null;
    } else {
      target.value = `${this.aaPageIndex}`;
    }
  }
  // 求中间变量
  get isLastIndex(): boolean {
    return this.aaPageIndex === this.maxIndex;
  }

  get isFirstIndex(): boolean {
    return this.aaPageIndex === this.minIndex;
  }
  // 工具函数
  min(val1: number, val2: number): number {
    return Math.min(val1, val2);
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.locale = this.i18n.getLocaleData('Pagination'));
  }

}
