import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { FruitsStoreComponent } from './fruits-store/fruits-store.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { UserComponentsModule } from '@user/components/user.components.module';

const createdComponents = [
  FruitsStoreComponent,
  CheckoutComponent,
  OrdersComponent,
  CardComponent,
  LeafletMapComponent,
];
@NgModule({
  declarations: [...createdComponents],
  imports: [
    UserComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...createdComponents],
})
export class UserContainersModule {}
