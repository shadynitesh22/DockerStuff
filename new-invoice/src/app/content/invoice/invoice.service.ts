import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  invoiceIndex: any;
  constructor(private http: HttpClient, private router: Router) { }

  getClient(): any {
    return this.http.get('invoice/getclient')
  }

  addinvoice(invoice: any): any {
    console.log(invoice);

    this.http.post('invoice/addinvoice', invoice, { responseType: 'text' }).subscribe((response: any) => {
      console.log(response);
      this.invoiceIndex = response
      this.router.navigate(['content/invoice/generated-invoice/' + this.invoiceIndex]);

    })


  }

  getInvoices(): any {
    console.log("get invoices");

    return new Promise((resolve, reject) => {
      this.http.get('invoice/getinvoice').subscribe((response) => {
        resolve(response)
      })

    })
  }

  editInvoice() {
    
  }

  deleteInvoice(i: any): any {


    return new Promise((resolve, reject) => {
      this.http.delete('invoice/deleteinvoice/' + i, { responseType: 'text' }).subscribe((response) => {
        console.log(response);

        resolve(response)

      })})
    }

  getInvoice(id: any): any{
      console.log(id);

      return new Promise((resolve, reject) => {
        this.http.get('invoice/getinvoice/' + id).subscribe((response) => {
          console.log(response);
          resolve(response)
        })

      })
    }
}
