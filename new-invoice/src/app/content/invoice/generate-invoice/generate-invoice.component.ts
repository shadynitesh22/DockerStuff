import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faChessBoard, faEllipsisV, faEnvelope, faHome, faMapMarkedAlt, faMapMarkerAlt, faMapPin, faPencilAlt, faPhone, faPlus, faSearch, faTrash, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Invoice } from '../invoice.model';
@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent implements OnInit {
  fabar = faBars;
  fasearch = faSearch;
  faellipsis = faEllipsisV;
  fapencilalt = faPencilAlt;
  fatrashalt = faTrashAlt;

  invoice:any;

  params:any;
  constructor(private library: FaIconLibrary,private route: ActivatedRoute) {
    library.addIcons(
      faUser,
      faEnvelope,
      faPhone,
      faHome,
      faChessBoard,
      faMapMarkedAlt,
      faMapPin,
      faMapMarkerAlt,
      faTrashAlt,
      faTrash,
      faPlus
    );



    this.route.data.subscribe((invoice)=>{
      this.invoice = invoice['invoice']



    })
    this.params = new Invoice({});
    this.params = this.invoice
  }

  ngOnInit(): void {
  }


  print(){
    window.print();
  }

  saveChange(){

  }
  addetails(){

  }
  removedetail(i:any){

  }
}
