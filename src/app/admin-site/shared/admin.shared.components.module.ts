import { CapitalizeFirstPipe } from './pipe/capitalizeFirst.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

const materialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
];
const createdComponents = [CapitalizeFirstPipe];

@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, ...materialComponents],
  exports: [...materialComponents, ...createdComponents],
})
export class AdminSharedComponentsModule {}
