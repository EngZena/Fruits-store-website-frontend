import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@user/components/components.module';
import { FruitsStoreComponent } from './fruits-store/fruits-store.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { SignupComponent } from './auth/signup/signup.component';

const createdComponents = [
  FruitsStoreComponent,
  LoginComponent,
  SignupComponent,
  CheckoutComponent,
  OrdersComponent,
  CardComponent,
  LeafletMapComponent,
];
@NgModule({
  declarations: [...createdComponents],
  imports: [ComponentsModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [...createdComponents],
})
export class ContainersModule {}
