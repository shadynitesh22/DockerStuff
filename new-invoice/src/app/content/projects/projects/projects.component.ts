import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faChessBoard, faEllipsisV, faEnvelope, faHome, faMapMarked, faMapMarkerAlt, faMapPin, faPencilAlt, faPhone, faSearch, faTrash, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { ClientService } from '../../clients/client.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  imgpath = 'assets/img/user.png'
  fabar = faBars
  fasearch = faSearch
  faellipsis = faEllipsisV
  fapencilalt = faPencilAlt
  fatrashalt = faTrashAlt
  params: any;
  projects:any;
  clients:any;
  id: any;
  arrayIndex:any;

  startingIndex!:number;
  endingIndex!:number;
  page:any;
  pages=5;
  setting:any;
  flag=1;
  displayprojects:any=[];


  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })


  constructor(private library: FaIconLibrary, private headername: HeaderService, private projectbackend: ProjectService,private http:HttpClient, private clientbackend: ClientService, private route:ActivatedRoute) {
    library.addIcons(
      faUser, faEnvelope,
      faPhone, faHome,
      faChessBoard, faMapMarked,
      faMapPin, faMapMarkerAlt
    )

    this.headername.changeheader('Projects')
    this.params = new Project({})

    this.route.data.subscribe((page:any)=>{
      this.page = page['test'];
  
      
    })
    this.setting = localStorage.getItem('project')
    
   


    this.clientbackend.getclients().subscribe((response:any)=>{
      this.clients  = response
    })
  }

  ngOnInit(): void {
    if(this.setting == 'frontend'){
    this.http.get('project/getprojects').subscribe((response:any)=>{
      this.projects = response
      
    })}

  }
  ngDoCheck(){
    
    this.startingIndex  = (this.page-1)*this.pages;
    this.endingIndex = (this.page*this.pages)-1
    if(this.projects && this.setting == 'frontend'){
      this.displayprojects =[];
      console.log("called using frontend pagination");
      
      
      for(let i=this.startingIndex;i<=this.endingIndex;i++){
        this.displayprojects.push(this.projects[i])
      }
  }else{
   
    
    if(this.flag && this.setting == 'backend'){
      this.endingIndex = (this.page*this.pages)
      this.projectbackend.getprojectswithquery(this.startingIndex, this.endingIndex).subscribe((response)=>{
        console.log("called using backend pagination");
        
        this.displayprojects =response
        if(this.displayprojects.length>5){
          this.displayprojects.splice(5,1)
        }
      })
      this.flag =0;
    }
  }
}
  edit(index: any){
    this.params = this.displayprojects[index];
   this.id = this.displayprojects[index]._id;

  }
  updateproject(){
    console.log(this.params);
    console.log(this.id);

    this.projectbackend.editprojects(this.id,this.params);

    this.Toast.fire({
      icon:'success',
      title:'Updated Project'
    })
  }

  delete(index: any){
    
    this.arrayIndex = index;
    this.id = this.displayprojects[index]._id;

  }

  confirmdelete(){
    this.projectbackend.deleteproject(this.id)

    this.projects.splice(this.arrayIndex,1)
    this.Toast.fire({
      icon:'success',
      title:'Project Removed'
    })
  }
  changeFlag(){
    this.flag=1;
  }

}
