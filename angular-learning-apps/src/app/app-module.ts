import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home.component';
import { appInterceptor } from './services/app.interceptor';
import { counterReducers } from './NgRxStore/counter.reducers';
import { userReducers } from './NgRxStore/user/user.reducer';
import { DebounceclickDirective } from './directives/debounce';
import { CapitalizePipe } from './pipes/capitalize-pipe'

@NgModule({
  declarations: [
    App,
    HomeComponent,
    DebounceclickDirective,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducers, users: userReducers })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([appInterceptor])),
  ],
  bootstrap: [App]
})
export class AppModule { }
