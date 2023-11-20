import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VitrineRoutingModule } from './vitrine-routing.module';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';


@NgModule({
  declarations: [
    SidebarNavigationComponent,
    HeaderComponent,
    FooterComponent,
    BrandLogoComponent
  ],
  imports: [
    CommonModule,
    VitrineRoutingModule
  ],
  exports: [
    SidebarNavigationComponent,
    HeaderComponent,
    FooterComponent,
    BrandLogoComponent
  ]
})
export class VitrineModule { }
