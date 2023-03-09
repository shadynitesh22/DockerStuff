import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faEdit, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  constructor(private library: FaIconLibrary, private headername: HeaderService){
    library.addIcons(
      faEdit, faTimes,
      faBars, faSearch
    )
    this.headername.changeheader('Projects')

   }
  ngOnInit(): void {
  }

}
