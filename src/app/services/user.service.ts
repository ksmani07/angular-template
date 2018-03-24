import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }
  createUser(userData){
    const body=JSON.stringify(userData);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(environment.API_URL + 'users/',body,{
      observe: 'body' ,
      headers : header
    });
  }
  getUser() {
    return this.httpClient.get(environment.API_URL + 'users/');
  }
  updateUser(userData,id){
    const body=JSON.stringify(userData);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.patch(environment.API_URL + 'users/' + id, body,{
      observe: 'body' ,
      headers : header
    });
  }

  deleteUser(id){
    return this.httpClient.delete(environment.API_URL + 'users/' + id);
  }

}
