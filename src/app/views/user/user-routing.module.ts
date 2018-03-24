import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'User'
    }
  },
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'user list'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
