// ng g directive components/input/input --module components/input
import { Directive, Input } from '@angular/core';

type AaSizeType = 'large' | 'default' | 'small';

@Directive({
  selector: '[aa-input]',
  host: {
    '[class.aa-input]': 'true',
    '[class.aa-input-disabled]': 'disabled',
    '[class.aa-input-lg]': `aaSize === 'large'`,
    '[class.aa-input-sm]': `aaSize === 'small'`
  }
})

export class InputDirective {
  private _disabled = false;

  @Input() nzSize: AaSizeType = 'default';

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  constructor() { }
}
