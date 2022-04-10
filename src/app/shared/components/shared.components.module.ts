import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

const createdComponents = [NoInternetComponent, PageNotFoundComponent];
@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, RouterModule],
  exports: [...createdComponents],
})
export class SharedComponentsModule {}
