import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';

@NgModule({
    declarations: [
    HeaderComponent,
    CardComponent,
  ],
    imports: [
    ],
    exports: [
      HeaderComponent,
      CardComponent,
    ]
})
export class ComponentsModule {

}