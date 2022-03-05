import { Component, HostListener, OnInit } from '@angular/core';

import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList = [];
  isLoading: boolean = true;
  emptyOrdersList: boolean = false;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ordersService.getOrderts().subscribe(data => {
      if (data) {
        this.ordersList = Object.values(data);
        if (this.ordersList.length > 0) {
          this.dataReceived();
          return (this.emptyOrdersList = false);
        } else {
          this.dataReceived();
          return (this.emptyOrdersList = true);
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentScrollHeight = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    if (!currentScrollHeight) {
      console.log('top');
    } else if (
      currentScrollHeight + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      console.log('bottom');
    }
  }

  dataReceived() {
    this.isLoading = false;
  }
}
