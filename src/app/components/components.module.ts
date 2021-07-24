import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from "./loading/loading.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { DropdownDirective } from "./Dropdown/dropdown.directive";

@NgModule({
    declarations: [
    HeaderComponent,
    LoadingComponent,
    AlertMessageComponent,
    DropdownDirective,
  ],
    imports: [
      CommonModule,
      RouterModule,
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      AlertMessageComponent,
      DropdownDirective,
    ]
})
export class ComponentsModule {

}