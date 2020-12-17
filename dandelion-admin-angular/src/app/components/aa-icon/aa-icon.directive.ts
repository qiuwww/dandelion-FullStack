// ng g directive components/aa-icon/aa-icon --module components/aa-icon
import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterContentChecked,
  Renderer2,
  ElementRef
} from "@angular/core";

import { AaIconService } from "./aa-icon.service";
import { UpdateHostClassService } from "../update-host-class.service";
import { AaSizeType } from "../../core/types/type";

@Directive({
  selector: "aa-icon, [aa-icon]",
  providers: [UpdateHostClassService]
})
export class AaIconDirective
  implements OnInit, OnChanges, OnDestroy, AfterContentChecked {
  // 这里的icon是借助于： http://www.fontawesome.com.cn/faicons/
  @Input()
  set aaType(value: string) {
    this._type = value;
    this.setClassMap();
  }

  get aaType(): string {
    return this._type;
  }

  @Input()
  set aaSize(value: AaSizeType) {
    this._size = value;
    this.setClassMap();
  }

  get aaSize(): AaSizeType {
    return this._size;
  }

  private classNameObserver: MutationObserver;
  private el = this.elementRef.nativeElement;
  private _type: string;
  private _size: AaSizeType;
  // 主namespace命名
  private prefixCls = "fa";

  constructor(
    public iconService: AaIconService,
    public elementRef: ElementRef, // 用来与dom节点建立联系
    // 扩展此基类以实现自定义渲染器。默认情况下，Angular 会把模板渲染成 DOM。 你可以使用自定义渲染器来拦截渲染类调用，或用于渲染一些非 DOM 的东西。
    public renderer: Renderer2,
    private updateHostClassService: UpdateHostClassService
  ) {
    // console.log(this);
    this.setClassMap();
  }
  ngOnInit(): void {
    // var observer = new MutationObserver(callback);
    this.classNameObserver = new MutationObserver(
      (mutations: MutationRecord[]) => {
        console.log("mutations: ", mutations);
        mutations
          .filter(
            (mutation: MutationRecord) => mutation.attributeName === "class"
          )
          .forEach((mutation: MutationRecord) =>
            console.log("MutationRecord: ", mutation.target)
          );
      }
    );
    // observer.observe(target, options)
    this.classNameObserver.observe(this.el, { attributes: true });
  }
  ngOnChanges(): void {}
  ngOnDestroy(): void {
    if (this.classNameObserver) {
      this.classNameObserver.disconnect();
    }
  }

  ngAfterContentChecked(): void {}
  setClassMap() {
    const classMap = {
      [`${this.prefixCls}`]: true,
      [`${this.prefixCls}-${this.aaType}`]: this.aaType,
      [`${this.prefixCls}-${this.aaSize}`]: this.aaSize
    };
    this.updateHostClassService.updateHostClass(this.el, classMap);
  }
}
