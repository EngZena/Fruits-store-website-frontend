import { AdminSharedComponentsModule } from '../shared/admin.shared.components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';

const createdComponents = [LayoutComponent];

@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, AdminSharedComponentsModule, AppRoutingModule],
  exports: [...createdComponents],
})
export class AdminComponentsModule {}
