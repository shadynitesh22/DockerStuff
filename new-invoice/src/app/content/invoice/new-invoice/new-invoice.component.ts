import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faCalendarAlt, faHashtag, faLayerGroup, faPlus, faSearch, faTrash, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../../clients/client.service';
import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  params: any;
  client: any;
  clientIndex: any;
  projectIndex: any;
  invoice: any;
  constructor(private library: FaIconLibrary, private clientbackend: ClientService, private invoicebackend: InvoiceService, private router: Router) {
    library.addIcons(
      faBars, faSearch,
      faLayerGroup, faUsers,
      faUser,
      faCalendarAlt, faHashtag,
      faTrash, faPlus

    )

    this.params = new Invoice({})


    this.invoicebackend.getClient().subscribe((response: any) => {
      console.log(response);

      this.client = response;
    });
    this.params.invoicenumber = "INV" + Date.now()
  }



  ngDoCheck() {
    for (let i = 0; i < this.params.itemdetails.length; i++) {
      this.params.itemdetails[i].amount = this.params.itemdetails[i].quantity * this.params.itemdetails[i].rate + +this.params.itemdetails[i].tax

    }
    this.params.subtotal = this.params.itemdetails.reduce((sum: any, list: any) => sum + +list.amount, 0) || 0;
    this.params.total = this.params.subtotal - ((this.params.discount*this.params.subtotal)/100);





    // if(this.params.projecttype){
    //   this.clientIndex = this.params.projecttype.split(' ')[1];
    //   this.projectIndex = this.params.projecttype.split(' ')[2];
    //   console.log(this.clientIndex);
    //   console.log(this.projectIndex);


    // }




  }

  ngOnInit(): void {
    // this.invoicebackend.getInvoice('62ecf2cfa848366b5c9f308d')

  }

  //very bad language
  indexValues() {
    console.log(this.params.projectname);

    const x = this.params.projectname.split(' ').length
    const split = this.params.projectname.split(' ')

    this.clientIndex = this.params.projectname.split(' ')[x - 2]
    this.projectIndex = this.params.projectname.split(' ')[x - 1]


    this.params.projecttype = this.client[this.clientIndex].projects[this.projectIndex].projecttype


  }

  async onSubmit() {
    this.params.projectname = this.client[this.clientIndex].projects[this.projectIndex].projectname


    const invoiceIndex = await this.invoicebackend.addinvoice(this.params)


    this.params = new Invoice({})


  }


  adddetails() {

    this.params.itemdetails.push({
      itemsdetails: "",
      quantity: null,
      rate: null,
      tax: null,
      amount: null
    })


  }

  removedetail(i: number) {
    this.params.itemdetails.splice(i, 1)
  }
}
