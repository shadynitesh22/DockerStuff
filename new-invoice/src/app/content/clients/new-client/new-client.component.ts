import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faChessBoard, faEnvelope, faHome, faMapMarkedAlt, faMapMarkerAlt, faMapPin, faPhone, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { ClientService } from '../client.service';
import { Clients } from '../clients.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent {
  params:any;
  shortlink:string='';
  loading:boolean= false;
  file!: File;
 formdata =  new FormData();

  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })

  constructor(private library:FaIconLibrary, private headername: HeaderService, private fileup: FileuploadService, private back: ClientService) {
    library.addIcons(
      faBars,faSearch, faUser,
      faEnvelope, faPhone, faHome,
      faChessBoard, faMapMarkedAlt,faMapPin,
      faMapMarkerAlt
    )
    this.headername.changeheader("Clients")

    this.params =  new Clients({})
    console.log(this.params)


  }

  addclient(){

    const filenewname =  this.params.firstname+Date.now()+"."+this.file.type.split('/')[1]
    this.formdata.set('image', this.file, filenewname);
    this.params.image = filenewname
    console.log(this.params);


    this.formdata.set('client',JSON.stringify(this.params))

    this.back.testclient(this.formdata).subscribe((response:any)=>{
      console.log(response);
      if(response){
        this.Toast.fire({
          icon:'success',
          title:'Client Added'
        })
      }

    })

  // ******************************needs to be uncommented*********************************
  // this.params = new Clients({});
  }





  onchange(event:any){
    this.file = event.target.files[0]
    console.log(this.file)
    // this.params.image = this.file
    // this.params.image = this.file
    console.log(this.params.image);


    console.log(this.file);
    console.log(this.file.name);


    console.log(this.file.type.split('/')[1]);

    console.log(this.formdata);

    const reader = new FileReader();

  }

  onUpload(){
    this.loading = !this.loading;
    console.log(this.file)
    this.fileup.upload(this.file).subscribe((event:any)=>{
      if(typeof(event)==='object'){
        this.shortlink =  event.link;
        this.loading = false;

      }
    });
  }




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

  capitalize(){

  }

}
