import { AdminSharedComponentsModule } from '../shared/admin.shared.components.module';
import { AdminSiteHomePageComponent } from './admin-site-home-page/admin-site-home-page.component';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';

const createdComponents = [AdminSiteHomePageComponent, CustomersComponent];
@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, AdminSharedComponentsModule],
  exports: [...createdComponents],
})
export class AdminContainersModule {}
