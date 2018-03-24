import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {LoaderService} from '../services/loader.service';
import {FlashService} from '../services/flash.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements  OnInit{
@ViewChild('f') loginForm:NgForm;
  isuserLogin: boolean = false;
  constructor(private authservice:LoginService,
              private router:Router,
              private loaderService:LoaderService,
              private flashService:FlashService) { }

  ngOnInit(){
    this.isuserLogin = this.authservice.islogedAccount();
    if(this.isuserLogin){
      this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit(form){
    this.loaderService.display(true);
    console.log('form',form);
    this.authservice.signin(form.value)
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('userId', data['userId']);
          // localStorage.setItem('username', data.username);
          this.loaderService.display(false);
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          this.loaderService.display(false)
          console.log(error);
          if(error.status !== 0 && error.error.error.message){
            this.flashService.message('error',error.error.error.message);
          }else {
            this.flashService.message('error','API Unable to connect or no internet');
          }
        }
        );

  }


}
