import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  isAdminUser = new Subject<boolean>();

  changeUserRole(isAdminUser: boolean) {
    this.isAdminUser.next(isAdminUser);
  }
}
