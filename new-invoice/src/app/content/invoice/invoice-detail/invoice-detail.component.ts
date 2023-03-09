import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faFilePdf, faInfoCircle, faPencilAlt, faPrint, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  constructor(private library: FaIconLibrary, private headername:HeaderService) {
    library.addIcons(
      faBars, faSearch, faPrint,
      faFilePdf, faInfoCircle, faPencilAlt
    )
    this.headername.changeheader("Invoice")
   }

  ngOnInit(): void {
  }

}
