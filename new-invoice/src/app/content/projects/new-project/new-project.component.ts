import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faCalendarAlt, faChessBoard, faEnvelope, faHashtag, faHome, faLayerGroup, faMapMarkedAlt, faMapMarkerAlt, faMapPin, faPhone, faSearch, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { ClientService } from '../../clients/client.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  params:any;
  clients:any;
  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })
  constructor(private library: FaIconLibrary, private headername: HeaderService, private projectBackend:ProjectService, private clientBackend:ClientService) {
    library.addIcons(
      faBars, faSearch,
      faUsers, faLayerGroup,
      faUser, faCalendarAlt,
      faHashtag, faEnvelope,faPhone,
      faMapMarkerAlt,faMapPin,faMapMarkedAlt,
       faHome,      faChessBoard
    )
    this.headername.changeheader("Projects")

    this.params = new Project({})
    console.log(this.params)
  }

  ngOnInit(): void {
    this.clientBackend.getclients().subscribe((response:any)=>{
      this.clients = response;
      console.log(this.clients);
      console.log(this.clients[0]._id);


    })
  }

  onSubmit(){
    console.log(this.params)
    this.projectBackend.addProjects(this.params);

    

    this.Toast.fire({
      icon:'success',
      title:'New Project Added'
    })
    // this.params = new Project({})

  }




}
