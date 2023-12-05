import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: '', component: ModulesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'order-list',
        loadChildren: () => import('./order-list/order-list.module').then((m) => m.OrderListModule)
      }
      ,
      {
        path: 'order-delivered',
        loadChildren: () => import('./order-deliverd/order-deliverd.module').then((m) => m.OrderDeliverdModule)
      }
      ,
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
      }
      ,
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule)
      }
      ,
      {
        path: 'unit-meseare',
        loadChildren: () => import('./unit-meseare/unit-meseare.module').then((m) => m.UnitMeseareModule)
      }
      ,
      {
        path: 'currency',
        loadChildren: () => import('./devise/devise.module').then((m) => m.DeviseModule)
      }
      ,
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then((m) => m.CountryModule)
      }
      ,
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
      }
      ,
      {
        path: 'roles',
        loadChildren: () => import('./role/role.module').then((m) => m.RoleModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
