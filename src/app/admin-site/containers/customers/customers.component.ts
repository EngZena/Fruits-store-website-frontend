import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CustomerModel } from '../../core/models/customers.models';
import { MatDialog } from '@angular/material/dialog';
import { RemoveCustomerDialogComponent } from '../../components/Dialog/remove-customer-dialog';
import { adminEmail } from 'src/app/shared/containers/auth/admin.data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customersList = [];
  customersDataExist = false;
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.getCustomersData();
  }

  getCustomersData() {
    this.route.data.subscribe((data: any) => {
      if (data.customersData.length > 0) {
        this.customersList = [...data.customersData];
        this.removeAdminFromCustomersList();
        this.customersDataExist = true;
      }
    });
  }

  removeAdminFromCustomersList() {
    this.customersList = this.customersList.filter(
      data => data.email !== adminEmail
    );
  }

  openDialog(customer: CustomerModel) {
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
    this.customersList = this.customersList.filter(
      data => data.userName !== userName
    );
  }
}
