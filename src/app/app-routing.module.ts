import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(value => value.AuthModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
