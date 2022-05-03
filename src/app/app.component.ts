import * as fromApp from '@store/app.reducer';
import * as fromAuthActions from './shared/containers/auth/store/auth.actions';

import { Component, OnInit } from '@angular/core';

import { NetworkService } from '@user/core/services/Network.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ThemeService } from './admin-site/core/theme/theme.service';
import { UserRoleService } from '@user/core/services/user.role.service';
import { adminEmail } from './shared/containers/auth/admin.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isOnline: Boolean;
  isAdminUser: Boolean;
  isDarkTheme: Observable<boolean>;

  constructor(
    private store: Store<fromApp.AppState>,
    private networkService: NetworkService,
    private userRoleService: UserRoleService,
    private themeService: ThemeService
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
    this.isDarkTheme = this.themeService.isDarkTheme;
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
