import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
    declarations: [
    HeaderComponent,
    CardComponent,
    LoadingComponent,
  ],
    imports: [
    ],
    exports: [
      HeaderComponent,
      CardComponent,
      LoadingComponent,
    ]
})
export class ComponentsModule {

}