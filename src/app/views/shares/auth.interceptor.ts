import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    const localToken = localStorage.getItem('token');
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    const copiedReq = req.clone({params: req.params.set('token', localToken)});
    return next.handle(copiedReq);
    // return null;
  }
}
