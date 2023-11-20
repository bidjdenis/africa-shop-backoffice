import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitMeseareRoutingModule } from './unit-meseare-routing.module';
import { UnitMeseareComponent } from './unit-meseare.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';



@NgModule({
  declarations: [
    UnitMeseareComponent
  ],
  imports: [
    CommonModule,
    UnitMeseareRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzPopconfirmModule,
  ]
})
export class UnitMeseareModule { }
