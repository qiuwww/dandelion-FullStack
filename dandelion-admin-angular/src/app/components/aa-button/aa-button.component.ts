import {
  Component,
  AfterContentInit,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild
} from "@angular/core";

import { AaSizeType, AaButtonType } from "../../core/types/type";
import { UpdateHostClassService } from "../update-host-class.service";
import { toBoolean } from "../../core/util/convert";

@Component({
  selector: "aa-button, [aa-button]",
  templateUrl: "./aa-button.component.html",
  providers: [UpdateHostClassService],
  preserveWhitespaces: false
})
// 如下的三个生命周期可以使用
export class AaButtonComponent implements AfterContentInit, OnInit, OnDestroy {
  // 这里指向当前的组件或者元素，也就是aa-button|button[aa-button]
  readonly el: HTMLElement = this.elementRef.nativeElement;
  // @ViewChild('contentElement') contentElement: ElementRef;

  // 取得输入的参数值
  @Input()
  get aaSize(): AaSizeType {
    return this._size;
  }

  set aaSize(value: AaSizeType) {
    this._size = value;
    this.setClassMap();
  }

  @Input()
  get aaType(): AaButtonType {
    return this._type;
  }
  set aaType(value: AaButtonType) {
    this._type = value;
    this.setClassMap();
  }

  @Input()
  set aaLoading(value: boolean) {
    this._loading = toBoolean(value);
    this.setClassMap();
    this.updateIconDisplay(value);
  }

  get aaLoading(): boolean {
    return this._loading;
  }

  constructor(
    private updateHostClassService: UpdateHostClassService,
    private elementRef: ElementRef
  ) {
    // console.log(this);
  }

  // 主namespace命名
  private prefixCls = "aa-button";

  // 私有变量，默认是_开头，这里的作用是作为中间变量
  private _size: AaSizeType;
  private _type: AaButtonType = "default";
  private _loading = false;
  // 这里使用枚举类型是不是更合适？这里写一个字典
  private sizeMap = { large: "lg", small: "sm" };

  // icon标签的元素
  private iconElement: HTMLElement;

  setClassMap(): void {
    const classMap = {
      [`${this.prefixCls}`]: true,
      [`${this.prefixCls}-${this.aaType}`]: this.aaType,
      // [`${this.prefixCls}-${this.nzShape}`]: this.nzShape,
      [`${this.prefixCls}-${this.sizeMap[this.aaSize]}`]: this.sizeMap[
        this.aaSize
      ],
      [`${this.prefixCls}-loading`]: this.aaLoading
      // [`${this.prefixCls}-icon-only`]: this.iconOnly,
      // [`${this.prefixCls}-background-ghost`]: this.nzGhost,
      // [`${this.prefixCls}-block`]: this.nzBlock,
      // [`ant-input-search-button`]: this.nzSearch
    };
    // 使用Renderer2，扩展此基类以实现自定义渲染器。
    this.updateHostClassService.updateHostClass(this.el, classMap);
  }
  updateIconDisplay(value: boolean): void {
    // // 拿到icon的元素，并进行一些dom操作
    // if (this.iconElement) {
    //   this.renderer.setStyle(this.iconElement, 'display', value ? 'none' : 'inline-block');
    // }
  }
  ngOnInit() {
    this.setClassMap();
  }
  ngAfterContentInit() {}
  ngOnDestroy() {}
  checkContent(): void {
    this.setClassMap();
    this.updateIconDisplay(this.aaLoading);
  }

  changeSize(e): void {
    this.aaSize = "small";
  }
}
