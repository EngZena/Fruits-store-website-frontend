import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(zone: NgZone) {}

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }
    console.log('error is ', error);
  }
}
