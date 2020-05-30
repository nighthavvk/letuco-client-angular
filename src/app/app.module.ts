import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularTokenModule } from 'angular-token';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShopModule } from './modules/shop/shop.module';
import { StaticModule } from './modules/static/static.module';
import { SharedModule } from './shared/shared.module';

import { APIInterceptor } from './interceptors/api/api.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: ''
    }),
    NgbModule,
    ShopModule,
    StaticModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
