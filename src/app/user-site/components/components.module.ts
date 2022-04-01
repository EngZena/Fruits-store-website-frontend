import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './Dropdown/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

const createdComponents = [
  HeaderComponent,
  LoadingComponent,
  AlertMessageComponent,
  DropdownDirective,
  NoInternetComponent,
  PageNotFoundComponent,
];
@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, RouterModule],
  exports: [...createdComponents],
})
export class ComponentsModule {}
