import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  gendersList: string[] = ['female', 'male'];
  signUpForm: FormGroup;
  forbiddenFirstName: string[] = ['Test', 'test'];

  constructor(private router: Router,
    private store: Store<fromApp.AppState> ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        newUserData: new FormGroup({
          username: new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
          ]),
          firstName: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
            this.forbiddenNames.bind(this),
          ]),
          lastName: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
          ]),
          email: new FormControl(
            null,
            [Validators.required, 
              Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
            this.forbiddenEmails.bind(this)
          ),
          password: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)
          ]),
          confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)
          ]),
        }),
        gender: new FormControl('female'),
        secret: new FormControl(null, Validators.required),
        questionAnswer: new FormControl(null, Validators.required),
      },
      {
        validators: this.validateEqualityPasswordAndConfirmPassword.bind(this),
      }
    );
  }
  validateEqualityPasswordAndConfirmPassword(formGroup: FormGroup) {
    const pass = formGroup.get('newUserData.password').value;
    const confirmpass = formGroup.get('newUserData.confirmPassword').value;
    if (pass !== confirmpass) {
      formGroup.get('newUserData.confirmPassword').setErrors({ 'passIsNotEqualToConfirmPass': true });
    } else {
      formGroup.get('newUserData.confirmPassword').setErrors(null);
    };
  }
  onSubmit() {
    if(!this.signUpForm.valid) return;
    const email = this.signUpForm.get('newUserData.email').value;
    const password = this.signUpForm.get('newUserData.password').value;
    this.store.dispatch(
      new AuthActions.SignupStart({
        email: email,
        password: password
      })
    );
    this.signUpForm.reset();
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenFirstName.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 15000);
    });
    return promise;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
