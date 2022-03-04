import { ErrorHandler, NgModule } from '@angular/core';

import { GlobalErrorHandler } from './errors/GlobalErrorHandler';
import { GlobalHttpInterceptorService } from './errors/HttpInterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  exports: [],
})
export class CoreModule {}
