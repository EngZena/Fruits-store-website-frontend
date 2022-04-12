import { AdminSharedComponentsModule } from '../shared/admin.shared.components.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';

const createdComponents = [LayoutComponent];

@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, AdminSharedComponentsModule],
  exports: [...createdComponents],
})
export class AdminComponentsModule {}
