import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
}
