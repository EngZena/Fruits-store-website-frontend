import * as AuthActions from '../store/auth.actions';
import * as fromApp from '@store/app.reducer';
import * as pattrens from '../pattrens';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  gendersList: string[] = ['female', 'male'];
  signUpForm: FormGroup;
  forbiddenFirstName: string[] = ['Test', 'test'];
  emailAlreadyExist: boolean = false;
  isLoading: boolean = false;
  private storeSub: Subscription;
  error: string = null;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        newUserData: new FormGroup({
          username: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
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
          email: new FormControl(null, [
            Validators.required,
            Validators.pattern(pattrens.emailPattren),
            this.forbiddenEmails.bind(this),
          ]),
          password: new FormControl(null, [
            Validators.required,
            Validators.pattern(pattrens.passwordPattren),
          ]),
          confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.pattern(pattrens.passwordPattren),
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
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  validateEqualityPasswordAndConfirmPassword(formGroup: FormGroup) {
    const pass = formGroup.get('newUserData.password').value;
    const confirmpass = formGroup.get('newUserData.confirmPassword').value;
    if (pass !== confirmpass) {
      formGroup
        .get('newUserData.confirmPassword')
        .setErrors({ passIsNotEqualToConfirmPass: true });
    } else {
      formGroup.get('newUserData.confirmPassword').setErrors(null);
    }
  }
  onSubmit() {
    if (!this.signUpForm.valid) return;
    const email = this.signUpForm.get('newUserData.email').value;
    const password = this.signUpForm.get('newUserData.password').value;
    const userName = this.signUpForm.get('newUserData.username').value;
    const firstName = this.signUpForm.get('newUserData.firstName').value;
    const lastName = this.signUpForm.get('newUserData.lastName').value;
    const gender = this.signUpForm.get('gender').value;
    const secretQuestion = this.signUpForm.get('secret').value;
    const secretAnswer = this.signUpForm.get('questionAnswer').value;
    this.authService
      .saveUserData(
        userName,
        firstName,
        lastName,
        email,
        gender,
        secretQuestion,
        secretAnswer
      )
      .subscribe();

    this.store.dispatch(
      new AuthActions.SignupStart({
        email: email,
        password: password,
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

  forbiddenEmails(control: FormControl) {
    this.authService.checkIfEmailExist().subscribe(responseData => {
      const emailsList = [];
      emailsList.push(Object.values(responseData));
      emailsList.map(item =>
        item.map(itemData => {
          {
            if (itemData.email === control.value) {
              this.emailAlreadyExist = true;
              control.setErrors({ EmailAlreadyExist: true });
            } else {
              const errorResult = pattrens.emailPattren.test(
                String(control.value).toLowerCase()
              );
              this.emailAlreadyExist = false;
              if (errorResult) {
                control.setErrors(null);
              } else {
                control.setErrors({ EmailIsNotValid: true });
              }
            }
          }
        })
      );
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
