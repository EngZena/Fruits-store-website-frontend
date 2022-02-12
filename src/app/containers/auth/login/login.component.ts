import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import * as fromActions from '../store/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  isLoading: boolean = false;
  error: string = null;
  private storeSub: Subscription;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new fromActions.LoginStart({
        email: email,
        password: password
      })
    );
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new fromActions.ClearError());
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }
}
