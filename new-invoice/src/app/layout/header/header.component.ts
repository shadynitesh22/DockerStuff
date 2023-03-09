import { Component, OnChanges, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faFileAlt,
  faFileInvoice,
  faLayerGroup,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from '../layout.service';
import config from '../../../assets/config.json';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from './header.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  header!: string;
  subscription: Subscription = new Subscription;
  value!:any;
  constructor(
    private library: FaIconLibrary,
    private data: HeaderService,
    private route: ActivatedRoute
  ) {
    library.addIcons(faFileAlt, faLayerGroup, faUserTie);

  }

  ngOnInit() {
    this.subscription = this.data.currentheader.subscribe((header: string)=>{this.header=header})

  }
  ngDoCheck(){

    this.value =  config.filter(f=>f.name==this.header)

    this.value = this.value[0]


  }

  ngOnDestroy(){
  }
}
