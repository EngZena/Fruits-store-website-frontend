import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../../core/services/customers.service';
import { adminEmail } from 'src/app/shared/containers/auth/admin.data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customersList = [];
  customersDataExist = false;
  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.customerService.getCustoemrsData().subscribe(data => {
      if (data.length > 0) {
        this.customersList = [...data];
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
