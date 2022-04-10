import { AdminSiteHomePageComponent } from './admin-site-home-page/admin-site-home-page.component';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';

const createdComponents = [];
@NgModule({
  declarations: [AdminSiteHomePageComponent, CustomersComponent],
  imports: [CommonModule],
  exports: [AdminSiteHomePageComponent, CustomersComponent],
})
export class AdminContainersModule {}
