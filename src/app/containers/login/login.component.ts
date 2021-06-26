import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    @ViewChild('loginForm', { static: false }) loginForm: NgForm;

    constructor( private router:Router){

    }
    onSubmit(form: NgForm) {
    console.log(form);
  }

  onSignUp(){
    this.router.navigate(['/signup']);
  }
}
