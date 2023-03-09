import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine, faCoffee, faCog, faFileAlt, faFileInvoiceDollar, faLayerGroup, faPowerOff, faSquare, faTachometer, faTachometerAlt, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  subscription!:Subscription;
  constructor(private library: FaIconLibrary, private data: HeaderService, private router: Router) {
    library.addIcons(
      faTachometerAlt,
      faSquare, faLayerGroup,
      faUserTie, faFileAlt,
      faChartLine, faFileInvoiceDollar,
      faCog, faPowerOff, faUser
    )

  }


  ngOnInit(): void {
  }
  changeheader(headername: string){
    this.data.changeheader(headername)
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
