import * as fromApp from '@user/store/app.reducer';
import * as fromOrdersActions from './store/orders.actions';

import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList = [];
  isLoading: boolean = true;
  emptyOrdersList: boolean = false;
  currentShownOrders = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {
    this.getOrdersData();
  }

  ngOnInit(): void {
    this.store.select('orders').subscribe(data => {
      this.currentShownOrders = [...data.currentLoadedOrdersList];
    });
  }

  getOrdersData() {
    this.isLoading = true;
    this.route.data.subscribe(data => {
      if (data.prevOrders == null) {
        this.dataReceived();
        return (this.emptyOrdersList = true);
      }
      this.ordersList = Object.values(data)[0];
      this.dataReceived();
      this.store.dispatch(
        new fromOrdersActions.setAllUserOrders(this.ordersList)
      );
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentScrollHeight = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    if (!currentScrollHeight) {
      // console.log('top');
    } else if (
      currentScrollHeight + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      // console.log('bottom');
      this.store.dispatch(new fromOrdersActions.setMoreUserOrders());
    }
  }

  dataReceived() {
    this.isLoading = false;
  }
}
