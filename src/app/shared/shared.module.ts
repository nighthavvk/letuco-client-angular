import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule
  ]
})
export class SharedModule { }
