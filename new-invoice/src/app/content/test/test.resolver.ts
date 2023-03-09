import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestResolver implements Resolve<Number> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Number> {
    const id = route.params['id']
    console.log("ajksdfhj");

    console.log(id);

    return id;
  }
}
