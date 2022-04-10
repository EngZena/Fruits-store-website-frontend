import * as fromApp from '@store/app.reducer';
import * as fromAuthActions from '@user/containers/auth/store/auth.actions';

import { Component, OnInit } from '@angular/core';

import { NetworkService } from '@user/core/services/Network.service';
import { Store } from '@ngrx/store';
import { UserRoleService } from '@user/core/services/user.role.service';
import { adminEmail } from '@user/containers/auth/admin.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isOnline: Boolean;
  isAdminUser: Boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private networkService: NetworkService,
    private userRoleService: UserRoleService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin());
    this.networkService
      .createOnline$()
      .subscribe(isOnline => (this.isOnline = isOnline));
    this.userRoleService.isAdminUser.subscribe(
      isAdminUser => (this.isAdminUser = isAdminUser)
    );
    this.checkUserRole();
  }

  checkUserRole() {
    this.store.select('auth').subscribe(data => {
      if (data.user.email === adminEmail) {
        this.isAdminUser = true;
      } else {
        this.isAdminUser = false;
      }
    });
  }
}
