import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faChessBoard, faEnvelope, faFilePdf, faHome, faMapMarkedAlt, faMapMarkerAlt, faMapPin, faPencilAlt, faPhone, faPrint, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  clientdetails: any;
  projects:any;
  
  constructor(private library: FaIconLibrary, private route: ActivatedRoute, private clientbackend:ClientService) {
    library.addIcons(
      faBars, faSearch, faPrint, faFilePdf,
      faPencilAlt, faUser, faEnvelope, faPhone,
      faHome, faChessBoard, faMapMarkedAlt, faMapPin,
      faMapMarkerAlt

    )
    this.route.data.subscribe((client: any) => {
      console.log(client);

      this.clientdetails = client['client'];
      console.log(this.clientdetails);

    })
    console.log(this.clientdetails['_id']);
    this.clientbackend.clientProjects(this.clientdetails['_id']).subscribe((response:any)=>{
      console.log(response);
      this.projects = response
    })


  }

  ngOnInit(): void {
  }

}
