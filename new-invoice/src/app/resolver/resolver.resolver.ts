import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InvoiceService } from '../content/invoice/invoice.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceResolver implements Resolve<any> {

  invoiceDetail:any;
  constructor(private router: Router, private invoicebackend:InvoiceService){

  }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.params['id']);
    const id = route.params['id']

    console.log(id);
    console.log('calling the invoice backed');

console.log(  this.invoicebackend.getInvoices().subscribe((response:any)=>{
  console.log(response);
  this.invoiceDetail = response
}));



// .then((response:any)=>{
//   console.log(response);
//   this.invoiceDetail = response
// });
console.log('invoice backend has bene called');

    // .then((response:any)=>{
    //   console.log(response);
    // this.invoiceDetail = response

    // })
    console.log(this.invoiceDetail);

    return route.params['id']


  }
}
