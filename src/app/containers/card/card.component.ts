import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckoutListItem } from 'src/app/containers/checkout/store/checkout.reducers';
import { FruitType } from 'src/app/models/FruitsModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  authorizedUser: boolean = false;
  constructor() {}

  @Input()
  imgName: string;

  @Input()
  name: string;

  @Input()
  price: string;

  @Output()
  addItem = new EventEmitter<CheckoutListItem>();

  @Output()
  removeItem = new EventEmitter<CheckoutListItem>();

  @Input()
  category: FruitType;

  enableRemove: boolean = false;

  ngOnInit(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.authorizedUser = true;
    }
  }

  onAdd() {
    this.addItem.emit({
      name: this.name,
      image: this.imgName,
      price: +this.price
    });
    this.enableRemove = true;
  }

  onRemove() {
    this.removeItem.emit({
      name: this.name,
      image: this.imgName,
      price: +this.price
    });
    this.enableRemove = false;
  }
}
