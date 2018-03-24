import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class LoginService{
  constructor(private httpClient: HttpClient){}
  signin(user){
    const body=JSON.stringify(user);
    const headers=new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(environment.API_URL + 'users/login', body
       ,{
       observe: 'body',
       headers: headers,
      responseType: 'json'});
      // .subscribe(
      //   req=>{
      //     console.log('response',req);
      //     return req;
      //   },
      //   err =>{
      //     console.log('error', err);
      //     return  err;
      //   }
      // );

  }
  logout()
  {
    localStorage.clear();
  }
  islogedAccount()
  {
    return localStorage.getItem('token')!==null;
  }
}
