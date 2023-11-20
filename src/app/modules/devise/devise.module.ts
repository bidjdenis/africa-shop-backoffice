import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviseRoutingModule } from './devise-routing.module';
import { DeviseComponent } from './devise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeviseComponent
  ],
  imports: [
    CommonModule,
    DeviseRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class DeviseModule { }
