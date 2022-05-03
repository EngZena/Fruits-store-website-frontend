import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { adminEmail } from 'src/app/shared/containers/auth/admin.data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customersList = [];
  customersDataExist = false;
  constructor(private route: ActivatedRoute) {
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
}
