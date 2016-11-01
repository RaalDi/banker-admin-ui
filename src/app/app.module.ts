import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { provideAuth, AuthConfigConsts } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { BankerUiRoutingModule } from './app-routing.module';
import { SignInComponent } from './authenticate/sign-in.component';
import { Authenticate } from './authenticate/authenticate.service';
import { BankerComponent } from './banker/banker.component';
import { CompanyInfoComponent } from './company/company-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

let cookieService = new CookieService();

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BankerComponent,
    CompanyInfoComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BankerUiRoutingModule,
    JsonpModule
  ],
  providers: [Authenticate, provideAuth({
    tokenGetter: (() => cookieService.get(AuthConfigConsts.DEFAULT_TOKEN_NAME))
  }), CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
