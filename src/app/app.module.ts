import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HttpClient, HttpClientModule} from '@angular/common/http';


import { HeaderComponent } from './components/header/header.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AuthComponent } from './modules/auth/auth.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuHeaderComponent,
    SignInComponent,
    SignUpComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: []
})
export class AppModule { }
