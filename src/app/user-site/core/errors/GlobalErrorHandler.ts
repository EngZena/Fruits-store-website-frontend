import { ErrorHandler, Injectable, NgZone } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

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
