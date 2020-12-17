// ng g module components/aa-pagination --module components/components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AaPaginationComponent } from './aa-pagination.component';
import { AaIconModule } from '../aa-icon/aa-icon.module';
import { NzI18nModule } from '../../core/i18n/nz-i18n.module';

@NgModule({
  declarations: [AaPaginationComponent],
  imports: [
    CommonModule,
    AaIconModule
  ],
  exports: [
    AaPaginationComponent,
    NzI18nModule
  ]
})
export class AaPaginationModule { }
