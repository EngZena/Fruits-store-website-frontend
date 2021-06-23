import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { FruitsStoreComponent } from './fruits-store/fruits-store.component';
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
    FruitsStoreComponent,
    LoginComponent,
  ],
    imports: [
      ComponentsModule,
      CommonModule,
      FormsModule,
    ],
    exports: [
      FruitsStoreComponent,
      LoginComponent,
    ]
})
export class ContainersModule {
    
}