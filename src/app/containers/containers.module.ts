import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { FruitsStoreComponent } from './fruits-store/fruits-store.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [
    FruitsStoreComponent,
    LoginComponent,
    SignupComponent,
  ],
    imports: [
      ComponentsModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,

    ],
    exports: [
      FruitsStoreComponent,
      LoginComponent,
      SignupComponent,

    ]
})
export class ContainersModule {
    
}