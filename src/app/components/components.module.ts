import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from "./loading/loading.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AlertMessageComponent } from './alert-message/alert-message.component';

@NgModule({
    declarations: [
    HeaderComponent,
    LoadingComponent,
    AlertMessageComponent,
  ],
    imports: [
      CommonModule,
      RouterModule,
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      AlertMessageComponent,
    ]
})
export class ComponentsModule {

}