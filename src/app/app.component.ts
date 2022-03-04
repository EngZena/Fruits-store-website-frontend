import * as fromApp from './store/app.reducer';
import * as fromAuthActions from './containers/auth/store/auth.actions';

import { Component, OnInit } from '@angular/core';

import { NetworkService } from './core/services/Network.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isOnline: Boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin());
    this.networkService
      .createOnline$()
      .subscribe(isOnline => (this.isOnline = isOnline));
  }
}
