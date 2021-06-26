import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  gendersList: string[] = ['female', 'male'];
  signUpForm: FormGroup;
  forbiddenFirstName: string[] = ['Test', 'test'];

  constructor() {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'newUserData': new FormGroup({
        'username': new FormControl(null,[Validators.required, Validators.minLength(4)]),
        'firstName': new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          this.forbiddenNames.bind(this)
        ]),
        'lastName': new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        'email': new FormControl(null, 
          [Validators.required, Validators.email],
          this.forbiddenEmails.bind(this)),
          'password': new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            this.passwordValue.bind(this)
          ]),
          'confirmPassword': new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            this.checkPasswords.bind(this)
          ]),
      }),
      'gender': new FormControl('female'),
      // 'secret': new FormArray([]),
      'secret': new FormControl(null, Validators.required),
      'questionAnswer': new FormControl(null, Validators.required),
    });

  } 

  onSubmit(){
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenFirstName.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> |Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if(control.value === 'test@test.com') {
          resolve ({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 15000)
    });
    return promise;
  }
  passwordvalue = '';
  passwordValue(control: FormControl){
    this.passwordvalue = control.value; 
  } 

  checkPasswords(control: FormControl){
      let confirmPassword =  control.value;
      return this.passwordvalue === confirmPassword ? null : {notMatch : true};
  }
}
