import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/ordersService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList = [];
  isLoading: boolean = true;
  emptyOrdersList: boolean = false;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ordersService.getOrderts().subscribe((data) => {
      if (data) {
        this.ordersList = Object.values(data);
        return (this.emptyOrdersList = false);
      }
    });
    this.emptyOrdersList = true;
    this.isLoading = false;
  }
}
