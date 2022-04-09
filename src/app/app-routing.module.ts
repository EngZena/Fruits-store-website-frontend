import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@user/containers/auth/login/auth.guard';
import { CheckoutComponent } from '@user/containers/checkout/checkout.component';
import { FruitsStoreComponent } from '@user/containers/fruits-store/fruits-store.component';
import { LoginComponent } from '@user/containers/auth/login/login.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from '@user/containers/orders/orders.component';
import { OrdersResolver } from '@user/core/services/Orders.resolver';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { SignupComponent } from '@user/containers/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  { path: 'store', component: FruitsStoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    component: OrdersComponent,
    resolve: { prevOrders: OrdersResolver },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [OrdersResolver],
})
export class AppRoutingModule {}
