import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';
import { ComponentsModule } from './shared/components/components.module';
import { SecondComponent } from './second/second.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FirstComponent } from './first/first.component';
import { SillyDatatable2Module } from 'projects/silly-datatable2/src/public-api';



@NgModule({
  declarations: [
    AppComponent,
    SecondComponent,
    FirstComponent,
  ],
  imports: [
    BrowserModule,
    SillyDatatable2Module,
    ReactiveFormsModule,
    ComponentsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditButtonComponent,
  ],
})
export class AppModule { }
