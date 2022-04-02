import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { GlobalErrorHandler } from './errors/GlobalErrorHandler';
import { GlobalHttpInterceptorService } from './errors/HttpInterceptor.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
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
  exports: [HttpClientModule],
})
export class UserCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: UserCoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'UserCoreModule is already loaded. Import only in AppModule'
      );
    }
  }
}
