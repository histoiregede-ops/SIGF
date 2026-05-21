import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProgressInterceptorService } from './core/interceptors/progress-interceptor.service';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { ErrorHandlerInterceptorService } from './core/interceptors/error-handler-interceptor.service';
import { ServerErrorPageComponent } from './features/pages/server-error-page/server-error-page.component';
import { RedirectionPageComponent } from './features/pages/redirection-page/redirection-page.component';
import { NgSelectConfig } from '@ng-select/ng-select';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ServerErrorPageComponent,
    RedirectionPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private config: NgSelectConfig) {
    registerLocaleData(fr.default);
    // this.config.appendTo = 'body';
    this.config.notFoundText = 'Aucun élément trouvé';
  }
}
