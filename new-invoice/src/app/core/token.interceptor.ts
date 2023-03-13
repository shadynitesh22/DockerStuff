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
    const isProduction = false; // set this to true in production

    let apiUrl;
    if (isProduction) {
      apiUrl = ' https://7e05-2400-1a00-b020-f1c6-d345-6f30-8dc5-ccc4.ap.ngrok.io';
    } else {
      apiUrl = 'http://localhost:5200';
    }
    
    const newRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      url: `${apiUrl}/new-invoice/v1/${request.url}`
    });
    


    return next.handle(newRequest);
  }
}
