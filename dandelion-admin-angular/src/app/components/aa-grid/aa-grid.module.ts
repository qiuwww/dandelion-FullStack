import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AaColComponent } from './aa-col/aa-col.component';
import { AaRowComponent } from './aa-row/aa-row.component';
import { AaRowDirective } from './aa-row/aa-row.directive';
import { AaColDirective } from './aa-col/aa-col.directive';

@NgModule({
  declarations: [AaColComponent, AaRowComponent, AaRowDirective, AaColDirective],
  exports: [
    AaColComponent, AaRowComponent, AaRowDirective, AaColDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AaGridModule { }
