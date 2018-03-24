import { Component } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(private authService:LoginService,private router:Router){}
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
