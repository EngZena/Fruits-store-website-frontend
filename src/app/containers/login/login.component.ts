import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @ViewChild('loginForm', { static: false }) loginForm: NgForm;
    onSubmit(form: NgForm) {
    console.log(form);
  }
}
