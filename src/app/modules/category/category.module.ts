import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from "ng-zorro-antd/input";
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
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
export class CategoryModule { }
