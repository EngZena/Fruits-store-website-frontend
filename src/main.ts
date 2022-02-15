import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

/*eslint no-undef: "error"*/
/*eslint-env node*/
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
