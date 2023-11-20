import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitMeseareComponent } from './unit-meseare.component';

const routes: Routes = [
  {
    path: '',
    component: UnitMeseareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitMeseareRoutingModule { }
