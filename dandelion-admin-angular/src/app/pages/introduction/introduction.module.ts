// ng g module pages/introduction --module pages/pages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module'
import { IntroductionComponent } from './introduction.component';

@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class IntroductionModule { }
