import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InvoiceService } from '../invoice.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceResolverResolver implements Resolve<boolean> {
  invoiceDetail: any;
  constructor(private router: Router, private invoicebackend: InvoiceService, private http :HttpClient) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const id = route.params['id']
    console.log(id);
    console.log('calling the invoice backed');

    return this.invoicebackend.getInvoice(id).then((response: any) => {
      console.log(response);
      this.invoiceDetail = response
      return this.invoiceDetail ||[];
    });







  }
}
