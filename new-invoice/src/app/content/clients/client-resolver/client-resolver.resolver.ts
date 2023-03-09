import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientService } from '../client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<any> {
  client:any;
  constructor(private router: Router,private http:HttpClient, private clientbackend:ClientService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id']

  return this.clientbackend.getclient(id).then((response:any)=>{
    console.log(response);
    this.client = response
    return this.client

  })
  }
}
export class TestResolver implements Resolve<number> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    const id = route.params['id']
    return id;
  }
}
