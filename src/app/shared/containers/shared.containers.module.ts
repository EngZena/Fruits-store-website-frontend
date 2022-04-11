import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponentsModule } from '@user/components/user.components.module';

const createdComponents = [LoginComponent, SignupComponent];
@NgModule({
  declarations: [...createdComponents],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [...createdComponents],
})
export class SharedContainersModule {}
