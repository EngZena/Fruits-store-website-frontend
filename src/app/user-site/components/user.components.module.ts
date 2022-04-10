import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './Dropdown/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

const createdComponents = [
  HeaderComponent,
  LoadingComponent,
  AlertMessageComponent,
  DropdownDirective,
];
@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, RouterModule, SharedComponentsModule],
  exports: [...createdComponents],
})
export class UserComponentsModule {}
