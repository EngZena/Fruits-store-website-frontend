import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './containers/auth/login/auth.guard';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { FruitsStoreComponent } from './containers/fruits-store/fruits-store.component';
import { LoginComponent } from './containers/auth/login/login.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './containers/orders/orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './containers/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  { path: 'store', component: FruitsStoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
