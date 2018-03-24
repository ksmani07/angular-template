import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit{
  constructor(private authService:LoginService,private router:Router){}
  ngOnInit(){
    if(!this.authService.islogedAccount()){
    this.router.navigateByUrl('/');
    }
  }
}
