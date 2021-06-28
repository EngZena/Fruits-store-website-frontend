import { Component, OnInit } from '@angular/core';

interface checkoutList {
  name: string;
  price: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  ngOnInit(): void {
  }

  orderList: checkoutList[] = [
    // {name: 'test', price: 5},
    // {name: 'test', price: 5},
    // {name: 'test', price: 5},
    // {name: 'test', price: 5},
  ];
}
