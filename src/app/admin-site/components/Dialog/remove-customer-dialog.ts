import { Component, Inject } from '@angular/core';
import { CustomerData } from '../../core/models/customers.models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-customer-dialog',
  templateUrl: './remove-customer-dialog.html',
})
export class RemoveCustomerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomerData) {}
}
