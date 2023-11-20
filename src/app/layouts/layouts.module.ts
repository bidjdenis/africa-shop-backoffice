import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { VitrineModule } from './vitrine/vitrine.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    VitrineModule,
  ],
  exports: [
    VitrineModule
  ]

})
export class LayoutsModule { }
