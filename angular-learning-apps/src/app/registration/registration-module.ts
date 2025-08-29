import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing-module';
import { RegistrationComponent } from './registration-component/registration-component';
import { DebounceclickDirective } from '../directives/debounce';


@NgModule({
  declarations: [
    RegistrationComponent,
    DebounceclickDirective
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistrationModule { }
