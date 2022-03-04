import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './Dropdown/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    AlertMessageComponent,
    DropdownDirective,
    NoInternetComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    LoadingComponent,
    AlertMessageComponent,
    DropdownDirective,
    NoInternetComponent,
  ],
})
export class ComponentsModule {}
