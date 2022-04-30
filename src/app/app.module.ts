import * as fromApp from '@store/app.reducer';

import { AdminComponentsModule } from './admin-site/components/admin.components.module';
import { AdminContainersModule } from './admin-site/containers/admin.containers.module';
import { AdminSharedComponentsModule } from './admin-site/shared/admin.shared.components.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './shared/containers/auth/store/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './shared/components/shared.components.module';
import { SharedContainersModule } from './shared/containers/shared.containers.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { UserComponentsModule } from '@user/components/user.components.module';
import { UserContainersModule } from '@user/containers/user.containers.module';
import { UserCoreModule } from '@user/core/user.core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    UserComponentsModule,
    UserContainersModule,
    HttpClientModule,
    UserCoreModule,
    SharedComponentsModule,
    SharedContainersModule,
    AdminComponentsModule,
    AdminSharedComponentsModule,
    AdminContainersModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({}),
    BrowserAnimationsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
