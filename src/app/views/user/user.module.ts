import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {CommonModule} from '@angular/common';
import {UserComponent} from '../user/user.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ChartsModule
  ],
  declarations: [
    UserComponent,
    ListComponent
  ]
})
export class UserModule { }
