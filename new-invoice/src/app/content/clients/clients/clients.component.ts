import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faChessBoard,
  faE,
  faEllipsisV,
  faEnvelope,
  faHome,
  faMapMarked,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMapPin,
  faPencilAlt,
  faPhone,
  faSearch,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { ClientService } from '../client.service';
import { Clients } from '../clients.model';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  profileImgpath = 'assets/img/avatar-02.jpg';
  fabar = faBars;
  fasearch = faSearch;
  faellipsis = faEllipsisV;
  fapencilalt = faPencilAlt;
  fatrashalt = faTrashAlt;

  // header define the heading the component, params takes the values from the input field and stores
  // them on it, clients are for the clients fetched from the backend, id stores the id of object that
  // requires to work on in the backend (ObjectId), index stores the index of the array

  header: string = '';
  params: any;
  clients: any;
  id:any;
  index:any;
  page:any;
  pages=5;
  displayclients:any=[];
  startingIndex!:number;
  endingIndex!:number;
  p: number = 1;
  setting:any;
  flag=1;


  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })

  constructor(
    private library: FaIconLibrary,
    private headername: HeaderService,
    private clientbackend: ClientService,
    private route:ActivatedRoute
  ) {
    library.addIcons(
      faUser,
      faEnvelope,
      faPhone,
      faHome,
      faChessBoard,
      faMapMarkedAlt,
      faMapPin,
      faMapMarkerAlt
    );
    console.log("constructor called first");


    this.headername.changeheader('Clients');

    this.params = new Clients({});


    this.route.data.subscribe((page:any)=>{
      this.page = page['test'];
    })
    this.setting = localStorage.getItem('client')
  
  }

  ngOnInit(): void {

    // first condition
  
    
   if(this.setting == 'frontend'){
  

    this.clientbackend.getclients().subscribe((response: any)=>{

    this.clients =response
    

    });
   
}

    // this.clientbackend.getClientswithquery(1,2)

  }
  ngDoCheck(){

    this.startingIndex  = (this.page-1)*this.pages;
    this.endingIndex = (this.page*this.pages)-1
    if(this.clients && this.setting == 'frontend'){
      this.displayclients =[];
      console.log("called using frontend pagination Client");

      for(let i=this.startingIndex;i<=this.endingIndex;i++){
        this.displayclients.push(this.clients[i])
      }
   

    }else{
 
      
      if(this.flag && this.setting == 'backend'){
        this.endingIndex = (this.page*this.pages)
      this.clientbackend.getClientswithquery(this.startingIndex, this.endingIndex).subscribe((response)=>{
        console.log("called using backend pagination Client");

        this.displayclients =response
        if(this.displayclients.length>5){
          this.displayclients.splice(5,1)
        }
      })
      this.flag =0;
    }
    }

  }

  edit(i:any){
    this.params = this.displayclients[i]
  }

  saveChange(){
    const id=this.params['_id']

    this.clientbackend.editclient(id, this.params)

    this.Toast.fire({
      icon:'success',
      title:'Client Updated.'
    })
  }


  delete(id:any){
    console.log(id);

    this.index = id

    this.id = this.displayclients[id]._id
  }

  confirmDelete(){
  this.clientbackend.deleteclient(this.id)

  this.clients.splice(this.index,1)

   this.Toast.fire({
    icon:'success',
    title:'Client Removed'
   })
  }


  changeFlag(){
    this.flag=1;
  }

/************************TO FORMAT THE NUMBER IN THE INPUT************************/
  countnumber(s:string){
    let numberstring = s.replace(/\D/g,'');
    return numberstring
  }

  numberformatter(){
    let cleannumber = this.countnumber(this.params.phone)

    if(cleannumber.length <=3){
      this.params.phone = '('+cleannumber+')'
    }
    else if(cleannumber.length <=3 && cleannumber.length<=6){
      this.params.phone = '('+ cleannumber.substr(0,3) +') ' + cleannumber.substr(3) ;

    }
    else if (cleannumber.length >= 6){
      this.params.phone = '('+ cleannumber.substr(0,3) +') ' +
      cleannumber.substr(3,3) + '-' +
      cleannumber.substr(6,cleannumber.length);
    }
  }








}
