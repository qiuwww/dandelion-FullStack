import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AaButtonComponent } from './aa-button.component';

@NgModule({
  declarations: [AaButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AaButtonComponent
  ]
})
export class AaButtonModule { }
