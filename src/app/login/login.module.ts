import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ChartsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
