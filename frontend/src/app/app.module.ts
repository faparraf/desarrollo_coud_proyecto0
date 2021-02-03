import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListEventComponent } from './event/list-event/list-event.component';
import { LoginComponent } from './login/login.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import {routing} from "./app.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./service/api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ListEventComponent,
    LoginComponent,
    AddEventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
