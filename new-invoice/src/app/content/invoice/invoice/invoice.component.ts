import { Component, OnInit } from '@angular/core';
import {
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faEdit,
  faSearch,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { InvoiceService } from '../invoice.service';
import Swal from 'sweetalert2';
import { Invoice } from '../invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoice: any;
  index:any;
  arrayIndex:any;
  params:any;
  constructor(
    private library: FaIconLibrary,
    private headername: HeaderService,
    private invoicebackend: InvoiceService
  ) {
    library.addIcons(faEdit, faTimes, faBars, faSearch, faTrash);
    this.headername.changeheader('Invoice');

    this.params = new Invoice({})

    this.invoicebackend.getInvoices().then((response: any) => {
      console.log(response);
      this.invoice = response;
    });
  }

  ngOnInit(): void {}

  ngDoCheck() {
    console.log(this.index);
    console.log(this.invoice);


  }
  // ngDoCheck(){
  //   this.params.amount = this.params.quantity * this.params.rate + (this.params.tax/100)
  //   this.params.subtotal = this.params.amount
  //   this.params.total = this.params.subtotal - this.params.discount
  // }

  saveChange(){

  }

  delete(i:any){
    this.index = this.invoice[i]._id
    this.arrayIndex = i
    console.log(i);

    console.log(this.index);

  }
  confirmDelete(){
    this.invoicebackend.deleteInvoice(this.index).then((response:any)=>{
      console.log(response);

      console.log('helloworld');

      console.log(this.arrayIndex);

      this.invoice.splice(this.arrayIndex,1)
    })


    const Toast = Swal.mixin({
      toast: true,
      position:'bottom-right',
      showConfirmButton:false,
      timer:2000,
      timerProgressBar:true,
    })

    Toast.fire({
      icon:'success',
      title:'Invoice Deleted'

    })

    // location.reload();
  }
  edit(i:any){
    this.index = this.arrayIndex[i]._id;
  }
  confirmchanges(){
    
  }
}
