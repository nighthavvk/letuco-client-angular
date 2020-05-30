import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule
  ],
  exports: [
    AlertComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
