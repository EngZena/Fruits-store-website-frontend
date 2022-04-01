import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { OrdersService } from '@user/core/services/orders.service';

@Injectable()
export class OrdersResolver implements Resolve<any> {
  constructor(private ordersService: OrdersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ordersService.getOrderts();
  }
}
