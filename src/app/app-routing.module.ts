import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitsStoreComponent } from './containers/fruits-store/fruits-store.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';

const routes: Routes = [
  {path: '', component: FruitsStoreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
