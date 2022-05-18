import * as fromApp from '../../../store/app.reducer';
import * as fromCusotmersActions from './store/customer.actions';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CustomerData } from '../../core/models/customers.models';
import { CustomerState } from './store/customer.reducers';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RemoveCustomerDialogComponent } from '../../components/Dialog/remove-customer-dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customersList = new Observable<CustomerState>();
  customersDataExist = false;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) {
    this.getCustomersData();
  }

  getCustomersData() {
    this.route.data.subscribe((data: any) => {
      if (data.customersData.length > 0) {
        this.store.dispatch(
          new fromCusotmersActions.setCustomersData(data.customersData)
        );
        this.store.dispatch(new fromCusotmersActions.removeAdminFromTheList());
        this.customersList = this.store.select('customers');
        this.customersDataExist = true;
      }
    });
  }

  openDialog(customer: CustomerData) {
    this.dialog
      .open(RemoveCustomerDialogComponent, {
        data: {
          firstlastNameName: customer.firstName,
          lastName: customer.lastName,
          userName: customer.userName,
        },
      })
      .afterClosed()
      .subscribe(result => {
        this.removeUserFromCustomersList(result);
      });
  }

  removeUserFromCustomersList(userName: string) {
    this.store.dispatch(
      new fromCusotmersActions.removeCustomerFromTheList(userName)
    );
  }
}
