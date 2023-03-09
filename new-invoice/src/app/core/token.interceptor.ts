import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token')

    const newRequest = request.clone({
      setHeaders: {Authorization : `Bearer ${token}`},
      url: `http://localhost:5200/new-invoice/v1/${request.url}`
    });



    return next.handle(newRequest);
  }
}
