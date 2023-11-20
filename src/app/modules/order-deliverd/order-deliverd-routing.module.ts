import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderDeliverdComponent } from './order-deliverd.component';

const routes: Routes = [
  {
    path: '',
    component: OrderDeliverdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDeliverdRoutingModule { }
