import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {
  @Input()
  alertType: string = '';
  @Input()
  alertMessage: string = '';
  hideMessage: boolean = true;
  successAlert: boolean = false;
  errorAlert: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (this.alertType === 'SUCCESS') {
      this.successAlert = true;
      this.errorAlert = false;
    }
    if (this.alertType === 'ERROR') {
      this.errorAlert = true;
      this.successAlert = false;
    }
    setTimeout(() => {
      this.hideMessage = false;
    }, 3000);
  }
}
