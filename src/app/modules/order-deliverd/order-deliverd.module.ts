import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliverdRoutingModule } from './order-deliverd-routing.module';
import { OrderDeliverdComponent } from './order-deliverd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderDeliverdComponent
  ],
  imports: [
    CommonModule,
    OrderDeliverdRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrderDeliverdModule { }
