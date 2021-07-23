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
 private orderListErrorSub: Subscription;
 orderListError: String = null;
  
  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
      this.ordersService.getOrderts().subscribe(
        (data) => {
          if(data){
            this.ordersList = Object.values(data)
          }
        }
      )
  }

}
